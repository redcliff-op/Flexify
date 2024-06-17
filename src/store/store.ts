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
  caloriesBurnt: number;
}

type actions = {
  signIn: () => Promise<void>;
  checkIfAlreadySignedIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserData: () => Promise<void>;
  startWorkout: (userData: UserData) => Promise<void>;
  stopWorkout: () => void;
}

type State = state & actions;

export const useStore = create<State>((set, get) => ({
  userInfo: null,
  userData: {height:0, weight:0},
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
          get().startWorkout(data.userData)
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
        get().startWorkout(data.userData)
      }
      router.navigate(`/(tabs)`);
    }
  },
  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      set({ userInfo: null, userData: {weight:0, height:0} });
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
      get().startWorkout(get().userData!!)
      router.navigate(`/(tabs)`);
    } catch (error) {
      console.log(error);
    }
  },
  steps: 0,
  caloriesBurnt: 0,
  subscription: null,
  startWorkout: async (userData: UserData) => {
    get().stopWorkout()
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      subscription = Pedometer.watchStepCount((stepCount) => {
        const steps = stepCount.steps;
        const caloriesBurnt = ((userData.height * 0.415 * steps) / 100000) * (0.57 * userData.weight);
        set({ steps, caloriesBurnt });
      });
    } else {
      console.log('Pedometer not available');
    }
  },
  stopWorkout: () => {
    if (subscription) {
      subscription.remove();
    }
  }
}));