import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';

const index = () => {

  GoogleSignin.configure({
    webClientId: "haha no"
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user)
      router.navigate(`/(tabs)`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView className='flex-1 justify-center bg-background p-5'>
      <Text className='text-white text-3xl'>
        Welcome!
      </Text>
      <Pressable
        onPress={() => {
          signIn()
        }}
        className='mb-10 p-4 bg-palelime rounded-full items-center self-stretch'>
        <Text className='font-bold text-lg'>
          Sign In
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default index