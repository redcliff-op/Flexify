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
        <SafeAreaView className=' bg-darkgray px-5 pb-7 rounded-b-[40]'>
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
              <Text className='text-white text-xl font-bold'>
                {userInfo?.user.name}
              </Text>
              <Text className='text-gray-300 text-base'>
                {userInfo?.user.email}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <Pressable
          onPress={()=>{
            router.navigate(`/userdetails`)
          }}
        >
          <View className='bg-darkgray rounded-3xl px-2 py-2 m-2'>
            <Text className='text-white text-lg ml-3 mb-1'>Personal Details</Text>
            <View className='py-3 px-5 bg-background rounded-3xl my-1'>
              <Text className='text-white text-lg'>Weight</Text>
              <Text className='text-palelime text-base'>{userData?.weight} KGs</Text>
            </View>
            <View className='py-3 px-5 bg-background rounded-3xl my-1'>
              <Text className='text-white text-lg'>Height</Text>
              <Text className='text-palelime text-base'>{userData?.height} CMs</Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={()=>{
            router.navigate(`/userdetails`)
          }}
        >
          <View className='bg-darkgray rounded-3xl px-2 py-2 m-2'>
            <Text className='text-white text-lg ml-3 mb-1'>Workout Preferences</Text>
            <View className='py-3 px-5 bg-background rounded-3xl my-1'>
              <Text className='text-white text-lg'>Daily Step Goal</Text>
              <Text className='text-palelime text-base'>{userData?.stepGoal} </Text>
            </View>
            <View className='py-3 px-5 bg-background rounded-3xl my-1'>
              <Text className='text-white text-lg'>Daily Calorie Target</Text>
              <Text className='text-palelime text-base'>{userData?.caloriesGoal} cal</Text>
            </View>
            <View className='py-3 px-5 bg-background rounded-3xl my-1'>
              <Text className='text-white text-lg'>Daily Distance Target</Text>
              <Text className='text-palelime text-base'>{userData?.distanceGoal} m</Text>
            </View>
          </View>
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