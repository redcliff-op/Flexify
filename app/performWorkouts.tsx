import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { workoutDesc } from '@/workoutDesc'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'

const performWorkouts = memo(() => {

  const { index } = useLocalSearchParams()
  const workout = workoutDesc[parseInt(index as string)]

  return (
    <View className='flex-1 px-2 bg-background'>
      <Animated.Image
        entering={FadeInUp}
        source={workout.image}
        className='rounded-b-[40] w-[100%] self-center h-[300] mb-2'
      />
      <Animated.View
        entering={FadeInDown}
        className='p-6 bg-darkgray rounded-t-[40] rounded-b-[40]'
      >
        <Text className='text-3xl mb-5 font-bold text-palelime'>
          {workout.title}
        </Text>
        <Text className='text-white text-lg'>
          About
        </Text>
        <Text className='text-gray-300 text-base'>
          {workout.desc}
        </Text>
      </Animated.View>
    </View>
  )
})

export default performWorkouts