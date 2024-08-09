import { Text, Pressable, View, Image } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useStore } from '@/src/store/store';
import { webClientId } from '@/Keys';
import LottieView from 'lottie-react-native';

const index = memo(() => {

  GoogleSignin.configure({
    webClientId: webClientId
  });

  const signIn = useStore(state => state.signIn)
  const checkIfAlreadySignedIn = useStore(state => state.checkIfAlreadySignedIn)
  const animation = useRef(null)

  useEffect(() => {
    checkIfAlreadySignedIn()
  }, [])

  return (
    <SafeAreaView className='flex-1 justify-between bg-background pt-10 px-4'>
      <Text className='text-palelime mb-3 font-extralight text-center text-5xl'>
        Flexify!
      </Text>
      <View>
        <Text className='text-white text-center text-xl'>
          Your <Text className='font-bold '>Fitness</Text>
        </Text>
        <Text className='text-white text-center text-xl'>
          Flexed to<Text className='font-bold '> Perfection!</Text>
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: '100%',
          height: '50%',
        }}
        source={require('../assets/raw/login.json')}
      />
      <View>
        <Text className='mb-10 text-white text-center text-xl'>Transform Your Steps into Success. Embrace Your Fitness Evolution!</Text>
        <Pressable
          onPress={() => {
            signIn()
          }}
          className='mb-10 p-4 bg-palelime rounded-3xl items-center self-stretch'>
          <View className='flex-row items-center'>
            <Image
              source={require('../assets/icons/google.png')}
              className='w-[20] h-[20] mr-2'
              tintColor={'black'}
            />
            <Text className='font-bold text-lg'>
              Sign In
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
})

export default index