import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { create } from 'zustand';

type authStore = {
  userInfo: User | null,
  signIn: () => Promise<void>,
  signOut: () => Promise<void>,
  checkIfAlreadySignedIn: () => Promise<void>
}

export const useAuthStore = create<authStore>((set) => ({
  userInfo: null,
  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      set(() => ({ userInfo: userInfo }))
      router.navigate(`/(tabs)`)
    } catch (error) {
      console.log(error)
    }
  },
  checkIfAlreadySignedIn: async () => {
    const userInfo = await GoogleSignin.getCurrentUser()
    if (userInfo !== null) {
      set(() => ({ userInfo: userInfo }))
      router.navigate(`/(tabs)`)
    }
  },
  signOut: async () => {
    try {
      await GoogleSignin.signOut()
      set(() => ({ userInfo: null }))
      router.dismissAll()
    } catch (error) {
      console.log(error)
    }
  },
}))