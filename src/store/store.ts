import { create } from "zustand";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Pedometer } from "expo-sensors";
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@/Keys";
import { UserData, Activity, ExerciseData, Meal, MealData, ChatMessage } from "@/global";
import RNFS from 'react-native-fs';

let subscription: Pedometer.Subscription;

type state = {
  userInfo: User | null;
  userData: UserData;
  activity: Activity,
  refActivity: Activity,
  isExercising: boolean,
  exerciseIntensity: number,
  currentExercise: string | undefined,
  exerciseData: ExerciseData | null,
  exerciseRecord: ExerciseData[],
  activityList: Activity[]
  date: string;
  meals: Meal[],
  mealLoading: boolean,
  mealData: MealData | null,
  messages: ChatMessage[],
  geminiLoading: boolean,
  contextHistory: Content[]
}

type actions = {
  signIn: () => Promise<void>;
  checkIfAlreadySignedIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserData: () => Promise<void>;
  startStepCounter: (userData: UserData) => Promise<void>;
  calculateCalories: (steps: number, user: UserData, intensity: number, exercise: string) => number,
  calculateDistance: (steps: number, user: UserData, intensity: number) => number,
  stopStepCounter: () => void;
  startExercise: () => void,
  updateDailyStats: () => Promise<void>,
  fetchCat: (category: string) => Promise<void>,
  fetchIngred: (ingred: string) => Promise<void>,
  fetchMealData: (id: string) => Promise<void>,
  getGeminiResponse: (prompt: string, image?: string | null) => Promise<string>,
  feedInitialGeminiData: (activityList: Activity[]) => Promise<void>
}

type State = state & actions;

export const useStore = create<State>((set, get) => ({

  userInfo: null,
  userData: { weight: 0, height: 0, stepGoal: 10000, caloriesGoal: 700, distanceGoal: 3000 },
  activity: { steps: 0, caloriesBurnt: 0, distance: 0 },
  refActivity: { steps: 0, caloriesBurnt: 0, distance: 0 },
  subscription: null,
  currentExercise: 'walk',
  exerciseData: null,
  isExercising: false,
  exerciseIntensity: 1,
  exerciseRecord: [],
  activityList: [],
  date: new Date().toISOString().split('T')[0],
  meals: [],
  mealLoading: false,
  mealData: null,
  messages: [],
  geminiLoading: false,
  contextHistory: [],

  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      set({ userInfo });
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get();
      if (!userSnapshot.exists) {
        router.navigate(`/userdetails`);
      } else {
        const data = userSnapshot.data();
        if (data && data.userData) {
          set({ userData: data.userData, exerciseRecord: data.exerciseRecord, activityList: data.activityList });
          const todaysActivity = get().activityList.find((p: Activity) => p.date?.toString() === get().date.toString())
          if (todaysActivity) {
            set({ activity: todaysActivity })
          }
          get().feedInitialGeminiData(data.activityList)
          get().startStepCounter(data.userData)
        }
        router.navigate(`/(tabs)`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  checkIfAlreadySignedIn: async () => {
    const userInfo = await GoogleSignin.getCurrentUser();
    if (userInfo !== null) {
      set({ userInfo });
      const userRef = firestore().collection('Users').doc(userInfo.user.email);
      const userSnapshot = await userRef.get();
      const data = userSnapshot.data();
      if (data) {
        set({ userData: data.userData });
        if (data.exerciseRecord) {
          set({ exerciseRecord: data.exerciseRecord, activityList: data.activityList })
          const todaysActivity = get().activityList.find((p: Activity) => p.date?.toString() === get().date.toString())
          if (todaysActivity) {
            set({ activity: todaysActivity })
          }
        }
        get().feedInitialGeminiData(data.activityList)
        get().startStepCounter(data.userData)
      }
      router.navigate(`/(tabs)`);
    }
  },

  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      set({ userInfo: null, userData: { weight: 0, height: 0, stepGoal: 10000, caloriesGoal: 700, distanceGoal: 3000 }, exerciseRecord: [] });
      router.dismissAll();
    } catch (error) {
      console.log(error);
    }
  },

  setUserData: async () => {
    try {
      const userRef = firestore().collection('Users').doc(get().userInfo?.user.email);
      await userRef.set({
        userData: get().userData,
        exerciseRecord: get().exerciseRecord,
        activityList: []
      });
      get().startStepCounter(get().userData!!)
      router.navigate(`/(tabs)`);
    } catch (error) {
      console.log(error);
    }
  },

  startStepCounter: async (userData: UserData) => {
    try {
      get().stopStepCounter();
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Pedometer not available', 'Step count will not work because the device lacks necessary sensors');
        return;
      }
      let perms = await Pedometer.getPermissionsAsync();
      if (!perms.granted) {
        await Pedometer.requestPermissionsAsync();
        perms = await Pedometer.getPermissionsAsync();
        if (!perms.granted) {
          Alert.alert('Permissions Required', 'Please allow access to track workout data from settings.');
        }
      }
      if (perms.granted) {
        const currentSteps = get().activity.steps
        subscription = Pedometer.watchStepCount((stepCount) => {
          const newSteps = stepCount.steps;
          const steps = currentSteps + newSteps;
          const caloriesBurnt = get().calculateCalories(steps, userData, get().exerciseIntensity, get().currentExercise!!);
          const distance = get().calculateDistance(steps, userData, get().exerciseIntensity);
          set({ activity: { steps, caloriesBurnt, distance } });

          if (get().isExercising) {
            const currentExerciseData = get().exerciseData;
            if (currentExerciseData) {
              set({
                exerciseData: {
                  ...currentExerciseData,
                  steps: steps - get().refActivity.steps,
                  calories: parseFloat((caloriesBurnt - get().refActivity.caloriesBurnt).toFixed(1)),
                  distance: parseFloat((distance - get().refActivity.distance).toFixed(1))
                }
              });
            }
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to start step counter. Please try again later.');
    }
  },

  stopStepCounter: () => {
    if (subscription) {
      subscription.remove();
    }
  },

  calculateCalories: (steps: number, user: UserData, intensity: number, exercise: string): number => {
    const metValues: { [key: string]: { [key: number]: number } } = {
      walk: {
        1: 2.0,
        2: 3.0,
        3: 4.0
      },
      sprint: {
        1: 6.5,
        2: 11.0,
        3: 14.0
      }
    };
    const met = metValues[exercise][intensity];
    const caloriesBurnt = (met * user.weight * steps * 0.0005);
    return parseFloat(caloriesBurnt.toFixed(1));
  },

  calculateDistance: (steps: number, user: UserData, intensity: number): number => {
    const strideLengthFactors: { [key: number]: number } = {
      1: 0.40,
      2: 0.414,
      3: 0.45
    };
    const strideFactor = strideLengthFactors[intensity];
    const strideLength = user.height * strideFactor;
    const distanceMeters = (steps * strideLength) / 100;
    return parseFloat(distanceMeters.toFixed(1));
  },

  startExercise: () => {
    if (!(get().isExercising)) {
      const startTime = new Date().getTime()
      set({
        exerciseData: {
          exercise: get().currentExercise,
          steps: 0,
          calories: 0,
          distance: 0,
          intensity: get().exerciseIntensity,
          startTime: startTime
        },
        refActivity: { ...get().activity }
      })
    } else {
      const currentExerciseData = get().exerciseData
      if (currentExerciseData) {
        set({ exerciseRecord: [...get().exerciseRecord, currentExerciseData] })
        set({
          exerciseData: null,
          refActivity: { steps: 0, caloriesBurnt: 0, distance: 0 },
          exerciseIntensity: 1,
          currentExercise: 'walk'
        })
        const userRef = firestore().collection('Users').doc(get().userInfo?.user.email);
        userRef.update({
          exerciseRecord: get().exerciseRecord
        })
      }
    }
    set({ isExercising: !(get().isExercising) })
  },
  updateDailyStats: async () => {
    try {
      const userRef = firestore().collection('Users').doc(get().userInfo?.user.email);
      const userSnapshot = await userRef.get();
      const data = userSnapshot.data();

      if (data) {
        const currentDate = get().date;
        const activityIndex = get().activityList.findIndex((a: Activity) => a.date === currentDate);
        if (activityIndex > -1) {
          get().activityList[activityIndex] = { ...get().activity, date: currentDate };
        } else {
          get().activityList.push({ ...get().activity, date: currentDate });
        }
        await userRef.update({
          activityList: get().activityList
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchCat: async (category: string) => {
    try {
      const response = await fetch(`www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const data = await response.json()
      set({ meals: data.meals })
    } catch (error) {
      console.log(error)
    }
  },
  fetchIngred: async (ingred: string) => {
    set({ mealLoading: true })
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
      const data = await response.json()
      set({ meals: data.meals })
    } catch (error) {
      console.log(error)
    }
    set({ mealLoading: false })
  },
  fetchMealData: async (id: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const data = await response.json()
      set({ mealData: data.meals[0] })
    } catch (error) {
      console.log(error)
    }
  },
  getGeminiResponse: async (prompt: string, image: string | null = null): Promise<string> => {
    set({ geminiLoading: true });
    try {
      const history = get().contextHistory
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: history,
      })
      let result;
      if (image) {
        const fsImage = await RNFS.readFile(image, 'base64');
        const img = {
          inlineData: {
            data: fsImage,
            mimeType: "image/png",
          },
        };
        result = await chat.sendMessage(["Which food is this? Please Fetch nutritional info about this food even if its not accurate, is this a health food?", img])
      } else {
        result = await chat.sendMessage(prompt)
      }
      const response = result.response;
      const text = response.text();
      set({ messages: [...get().messages, { message: text, ai: true, time: new Date().toLocaleTimeString().slice(0, -3) }] });
      set({ contextHistory: history })
      return text;
    } catch (error) {
      console.log(error);
      return '';
    } finally {
      set({ geminiLoading: false });
    }
  },
  feedInitialGeminiData: async (activityList: Activity[]) => {
    try {
      const history = get().contextHistory
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: history,
      })
      await chat.sendMessage(`This is my all time workout statistics based off of which I can ask questions so remember it. ${JSON.stringify(activityList)}`)
      set({ contextHistory: history })
    } catch (error) {
      console.log(error);
    }
  },
}));
