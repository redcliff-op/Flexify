import { View, Text, ImageBackground, ImageSourcePropType, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { workoutDesc } from '@/workoutDesc'

interface WorkoutCategoryProps {
  index: number
}

const WorkoutCategoryCard = ({ index }: WorkoutCategoryProps) => {

  const image = workoutDesc[index].image
  const title = workoutDesc[index].title
 
  return (
    <Pressable
      onPress={() => {
        router.navigate({pathname:`/performWorkouts`, params: {index}})
      }}
      className='flex-1 my-1'
    >
      <ImageBackground
        borderRadius={20}
        className='mt-2 w-max h-[200]'
        source={image}
      >
        <View className='flex-1 justify-end'>
          <View className=' rounded-b-[20] w-max bg-gray-900 px-2 py-3' style={{ backgroundColor: 'rgba(31, 41, 55, 0.70)' }}>
            <Text className='text-palelime font-bold text-base text-center'>{title}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default WorkoutCategoryCard