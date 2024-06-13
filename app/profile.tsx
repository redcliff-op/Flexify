import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/src/stores/authStore'
import { router } from 'expo-router'

const profile = () => {
  const userInfo = useAuthStore((state) => state.userInfo?.user)
  const signOut = useAuthStore(state => state.signOut);
  return (
    <View className='flex-1 bg-background justify-between'>
      <SafeAreaView className=' bg-darkgray px-5 pb-7 rounded-b-[40]'>
        <View className='flex-row justify-between items-center'>
          <Pressable
            className='self-center'
            onPress={() => { router.dismiss()}}
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
            source={{ uri: userInfo?.photo?.toString() }}
            className='w-[100] h-[100] rounded-full'
          />
          <View className='self-center ml-3'>
            <Text className='text-white text-xl font-bold'>
              {userInfo?.name}
            </Text>
            <Text className='text-gray-300 text-base'>
              {userInfo?.email}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <Pressable
        className='bg-palelime rounded-3xl p-5 mx-5 mb-5'
        onPress={()=>{signOut()}}
      >
        <Text className='text-black text-lg font-bold self-center'>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default profile