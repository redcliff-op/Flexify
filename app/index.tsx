import { Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useStore } from '@/src/store/store';

const index = () => {

  GoogleSignin.configure({
    webClientId: "250899975418-upkqdt2v6ort0n5jobp2hulq4g88ap7k.apps.googleusercontent.com"
  });

  const signIn = useStore(state=>state.signIn)
  const checkIfAlreadySignedIn = useStore(state=>state.checkIfAlreadySignedIn)
  
  useEffect(()=>{
    checkIfAlreadySignedIn()
  },[])

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