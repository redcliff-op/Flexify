import { Text, Pressable, ImageBackground, View, ViewStyle, StyleProp } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import Collapsible from 'react-native-collapsible'
import { useStore } from '@/src/store/store'
import { Meal } from '@/global'

interface MealCardProps {
  meal: Meal,
  style? : StyleProp<ViewStyle>
}

const MealCard = ({ meal, style }: MealCardProps) => {

  const [expanded, setExpanded] = useState<boolean>(false)
  const {fetchMealData} = useStore((state)=>({
    fetchMealData: state.fetchMealData
  }))

  return (
    <Pressable
      onPress={() => {
        setExpanded(!expanded)
      }}
      className=' justify-center rounded-3xl items-center m-2 flex-1'>
      <ImageBackground
        className=' w-[100%] h-[200] opacity-95'
        borderRadius={20}
        source={{ uri: meal.strMealThumb }}
      >
        <View className='flex-1 justify-end' style={style}>
          <View className=' rounded-b-[20] w-max bg-gray-900 px-2 py-3' style={{ backgroundColor: 'rgba(31, 41, 55, 0.85)' }}>
            <Text numberOfLines={1} className='mt-2 text-white text-center text- font-bold'>{meal.strMeal}</Text>
            <Collapsible collapsed={!expanded}>
              <Pressable
                onPress={()=>{
                  router.navigate(`/mealData`)
                  fetchMealData(meal.idMeal.toString());
                }}
              >
                <Text className='text-palelime mr-3 text-center text-sm'>Continue</Text>
              </Pressable>
            </Collapsible>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default MealCard