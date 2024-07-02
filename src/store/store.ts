import { create } from "zustand";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Pedometer } from "expo-sensors";
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";

let subscription: Pedometer.Subscription;

type state = {
  userInfo: User | null;
  userData: UserData;
  steps: number;
  refSteps: number,
  caloriesBurnt: number;
  refCaloriesBurnt: number,
  distance: number,
  refDistance: number,
  isExercising: boolean,
  exerciseIntensity: number,
  currentExercise: string | undefined,
  exerciseData: ExerciseData | null,
  exerciseRecord: ExerciseData[]
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
}

type State = state & actions;

export const useStore = create<State>((set, get) => ({

  userInfo: null,
  userData: { height: 0, weight: 0 },
  steps: 0,
  refSteps: 0,
  caloriesBurnt: 0,
  refCaloriesBurnt: 0,
  distance: 0,
  refDistance: 0,
  subscription: null,
  currentExercise: 'walk',
  exerciseData: null,
  isExercising: false,
  exerciseIntensity: 1,
  exerciseRecord: [],

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
          set({ userData: data.userData, exerciseRecord: data.exerciseRecord });
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
        get().startStepCounter(data.userData)
        if (data.exerciseRecord) {
          set({ exerciseRecord: data.exerciseRecord })
        }
      }
      router.navigate(`/(tabs)`);
    }
  },

  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      set({ userInfo: null, userData: { weight: 0, height: 0 }, exerciseRecord: [] });
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
        exerciseRecord: get().exerciseRecord
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
        if(!perms.granted){
          Alert.alert('Permissions Required', 'Please allow access to track workout data from settings.');
        }
      }
      if (perms.granted) {
        subscription = Pedometer.watchStepCount((stepCount) => {
          const steps = stepCount.steps;
          const caloriesBurnt = get().calculateCalories(steps, userData, get().exerciseIntensity, get().currentExercise!!);
          const distance = get().calculateDistance(steps, userData, get().exerciseIntensity);
          set({ steps, caloriesBurnt, distance });
  
          if (get().isExercising) {
            const currentExerciseData = get().exerciseData;
            if (currentExerciseData) {
              set({
                exerciseData: {
                  ...currentExerciseData,
                  steps: steps - get().refSteps,
                  calories: parseFloat((caloriesBurnt - get().refCaloriesBurnt).toFixed(1)),
                  distance: parseFloat((distance - get().refDistance).toFixed(1))
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
        refSteps: get().steps,
        refCaloriesBurnt: get().caloriesBurnt,
        refDistance: get().distance
      })
    } else {
      const currentExerciseData = get().exerciseData
      if (currentExerciseData) {
        set({ exerciseRecord: [...get().exerciseRecord, currentExerciseData] })
        set({
          exerciseData: null,
          refSteps: 0,
          refCaloriesBurnt: 0,
          refDistance: 0,
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
}));