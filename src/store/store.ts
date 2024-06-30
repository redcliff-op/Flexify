import { create } from "zustand";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Pedometer } from "expo-sensors";
import firestore from '@react-native-firebase/firestore';

let subscription: Pedometer.Subscription;

type state = {
  userInfo: User | null;
  userData: UserData;
  steps: number;
  refSteps: number,
  caloriesBurnt: number;
  refCaloriesBurnt: number,
  isExercising: boolean,
  exerciseIntensity: number,
  currentExercise: string | undefined,
  exerciseData: exerciseData | null
}

type actions = {
  signIn: () => Promise<void>;
  checkIfAlreadySignedIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserData: () => Promise<void>;
  startStepCounter: (userData: UserData) => Promise<void>;
  stopStepCounter: () => void;
  startExercise: () => void,
}

type State = state & actions;

export const useStore = create<State>((set, get) => ({
  userInfo: null,
  userData: { height: 0, weight: 0 },
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
          set({ userData: data.userData });
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
      if (data && data.userData) {
        set({ userData: data.userData });
        get().startStepCounter(data.userData)
      }
      router.navigate(`/(tabs)`);
    }
  },
  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      set({ userInfo: null, userData: { weight: 0, height: 0 } });
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
      });
      get().startStepCounter(get().userData!!)
      router.navigate(`/(tabs)`);
    } catch (error) {
      console.log(error);
    }
  },
  steps: 0,
  refSteps: 0,
  caloriesBurnt: 0,
  refCaloriesBurnt:0,
  subscription: null,
  startStepCounter: async (userData: UserData) => {
    get().stopStepCounter()
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      subscription = Pedometer.watchStepCount((stepCount) => {
        const steps = stepCount.steps;
        const caloriesBurnt = (((userData.height * 0.415 * steps) / 100000) * (0.57 * userData.weight))
        set({ steps, caloriesBurnt: parseFloat(caloriesBurnt.toPrecision(2)) });
        if(get().isExercising){
          const currentExerciseData = get().exerciseData
          if(currentExerciseData){
            set({
              exerciseData: {
                ...currentExerciseData,
                steps: steps - get().refSteps,
                calories: parseFloat((caloriesBurnt - get().refCaloriesBurnt).toPrecision(2))
              }
            })
          }
        }
      });
    } else {
      console.log('Pedometer not available');
    }
  },
  stopStepCounter: () => {
    if (subscription) {
      subscription.remove();
    }
  },
  isExercising: false,
  exerciseIntensity: 2,
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
          startTime: startTime,
          endTime: undefined
        },
        refSteps: get().steps,
        refCaloriesBurnt: get().caloriesBurnt
      })
    } else {
      const endTime = new Date().getTime()
      const currentExerciseData = get().exerciseData
      if(currentExerciseData){
        set({
          exerciseData: {
            ...currentExerciseData,
            endTime: endTime
          }
        })
        set({exerciseData: null, refSteps: 0, refCaloriesBurnt: 0})
      }
    }
    set({ isExercising: !(get().isExercising)})
  },
  currentExercise: undefined,
  exerciseData: null
}));