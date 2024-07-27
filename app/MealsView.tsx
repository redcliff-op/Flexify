import { Text, Image, Pressable } from 'react-native'
import React from 'react'

interface MealCardProps {
  meal: Meal
}

const MealCard = ({ meal }: MealCardProps) => {

  return (
    <Pressable
      onPress={() => {

      }}
      className=' justify-center items-center m-1.5 flex-1 rounded-3xl bg-darkgray p-5'>
      <Image
        className=' rounded-full w-[150] h-[100]'
        source={{ uri: meal.strMealThumb }}
      />
      <Text className='mt-2 text-white text-base font-bold'>{meal.strMeal}</Text>
    </Pressable>
  )
}

export default MealCard