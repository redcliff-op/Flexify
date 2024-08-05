import { View, Text, Image, Pressable } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useStore } from '@/src/store/store'

const profile = memo(() => {
  const { userInfo, signOut, userData } = useStore((state) => ({
    signOut: state.signOut,
    userInfo: state.userInfo,
    userData: state.userData
  }))
  return (
    <View className='flex-1 bg-background justify-between'>
      <View>
        <SafeAreaView className=' bg-darkgray px-5 mb-2 pb-7 rounded-b-[40]'>
          <View className='flex-row justify-between items-center'>
            <Pressable
              className='self-center'
              onPress={() => { router.dismiss() }}
            >
              <Image
                source={require('../assets/icons/leftarrow.png')}
                tintColor={'white'}
                className='w-[30] h-[30]'
              />
            </Pressable>
            <Text className='text-white text-base font-bold'>My Profile</Text>
            <Image
              source={require('../assets/icons/leftarrow.png')}
              tintColor={'#2D2D36'}
              className='w-[30] h-[30]'
            />
          </View>
          <View className='flex-row mt-5'>
            <Image
              source={{ uri: userInfo?.user.photo?.toString() }}
              className='w-[100] h-[100] rounded-full'
            />
            <View className='self-center ml-3'>
              <Text className='text-palelime text-xl'>
                {userInfo?.user.name}
              </Text>
              <Text className='text-gray-300 text-base'>
                {userInfo?.user.email}
              </Text>
              <Text className='text-gray-300 text-base'>
                How are you doing?
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <Pressable
          className='bg-darkgray items-center justify-between rounded-3xl flex-row px-2 py-5 m-2'
          onPress={() => {
            router.navigate(`/userdetails`)
          }}
        >
          <Text className='text-palelime text-lg ml-3 mb-1'>Manage personal details</Text>
          <Image
            source={require('../assets/icons/profile.png')}
            className='w-[25] h-[25] mr-2'
            tintColor={'#D5FF5F'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.navigate(`/userdetails`)
          }}
          className='bg-darkgray justify-between rounded-3xl flex-row px-2 py-5 m-2'
        >
          <Text className='text-palelime text-lg ml-3 mb-1'>Manage workout preferences</Text>
          <Image
            source={require('../assets/icons/run.png')}
            className='w-[30] h-[30] mr-2'
            tintColor={'#D5FF5F'}
          />
        </Pressable>
      </View>
      <Pressable
        className='bg-palelime rounded-3xl p-5 mx-5 mb-5'
        onPress={() => { signOut() }}
      >
        <Text className='text-black text-lg font-bold self-center'>Sign Out</Text>
      </Pressable>
    </View>
  )
})

export default profile