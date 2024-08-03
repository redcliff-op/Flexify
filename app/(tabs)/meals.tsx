import MealCard from '@/components/MealCard'
import { useStore } from '@/src/store/store'
import React, { memo, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const meals = memo(() => {

  const { meals, fetchIngred, mealLoading } = useStore((state) => ({
    meals: state.meals,
    fetchCat: state.fetchCat,
    fetchIngred: state.fetchIngred,
    mealLoading: state.mealLoading
  }))

  const [mode, setMode] = useState<string>("Eggs")

  const topNavBarElems: string[] = ["Eggs", "Chicken", "Milk", "Salmon", "Chickpeas", "Mushrooms", "Prawns", "Paneer"]

  useEffect(()=>{
    fetchIngred("Eggs")
  },[])

  return (
    <SafeAreaView className='flex-1 bg-background px-2'>
      <Text className=' px-2 text-white text-xl font-bold'>Meals!</Text>
      <Text className=' px-2 text-base text-gray-300'>Choose From any of the Given Categories!</Text>
      <View className='flex-row mt-2 justify-center'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topNavBarElems.map((item) =>
            <Pressable
              onPress={() => {
                setMode(item)
                if (item !== 'Categories') {
                  fetchIngred(item)
                }
              }}
              className='py-3 items-center mx-2 flex-auto px-5 rounded-2xl'
              style={{ backgroundColor: (item === mode) ? '#D5FF5F' : '#2D2D36' }}
            >
              <Text
                style={{ color: (item === mode) ? 'black' : 'white' }}
                className='text-base font-bold'
              >
                {item}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
      {!(mealLoading) ? (
        <FlatList
          className='mt-2'
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <MealCard meal={item} />
          )}
          numColumns={2}
        >
        </FlatList>
      ):(
      <View className='flex-1 items-center justify-center'>
        <View className='flex-row items-center justify-center'>
          <Text className='text-lg font-bold mr-3 text-white'> Loading</Text>
          <ActivityIndicator color={'#D5FF5F'} size={150} className='absolute'></ActivityIndicator>
        </View >
      </View >
      )}
    </SafeAreaView >
  )
})

export default meals