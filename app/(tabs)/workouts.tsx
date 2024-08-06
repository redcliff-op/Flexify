import { View, Text, ScrollView } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutCategoryCard from '@/components/WorkoutCategoryCard'

const workouts = memo(() => {
  return (
    <SafeAreaView className='flex-1 px-4 bg-background '>
      <Text className='text-white text-xl font-bold'>Workout!</Text>
      <Text className='text-gray-300 text-base '>Choose what to train!</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkoutCategoryCard
          index={0}
        />
        <WorkoutCategoryCard
          index={1}
        />
        <WorkoutCategoryCard
          index={2}
        />
        <WorkoutCategoryCard
          index={3}
        />
        <WorkoutCategoryCard
          index={4}
        />
        <WorkoutCategoryCard
          index={5}
        />
        <WorkoutCategoryCard
          index={6}
        />
        <WorkoutCategoryCard
          index={7}
        />
      </ScrollView>
    </SafeAreaView>
  )
})

export default workouts