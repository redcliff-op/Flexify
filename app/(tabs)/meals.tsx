import MealCard from '@/components/MealCard'
import { useStore } from '@/src/store/store'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const meals = memo(() => {

  const { meals, fetchIngred, mealLoading, getGeminiResponse, activity, messages } = useStore((state) => ({
    meals: state.meals,
    fetchCat: state.fetchCat,
    fetchIngred: state.fetchIngred,
    mealLoading: state.mealLoading,
    getGeminiResponse: state.getGeminiResponse,
    activity: state.activity,
    messages: state.messages
  }))

  const [mode, setMode] = useState<string>("Eggs")

  const topNavBarElems: string[] = ["Eggs", "Chicken", "Milk", "Salmon", "Chickpeas", "Mushrooms", "Prawns", "Paneer"]

  useEffect(() => {
    fetchIngred("Eggs")
  }, [])

  const animation = useRef(null)

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
        <Animated.FlatList
          entering={FadeIn}
          exiting={FadeOut}
          className='mt-2'
          data={meals}
          keyExtractor={(item) => item.strMealThumb}
          renderItem={({ item }) => (
            <MealCard meal={item} />
          )}
          numColumns={2}
        >
        </Animated.FlatList>
      ) : (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 items-center justify-center'
        >
          <View className='flex-row items-center justify-center'>
            <Text className='text-lg font-bold mr-3 text-white'> Loading</Text>
            <ActivityIndicator color={'#D5FF5F'} size={150} className='absolute'></ActivityIndicator>
          </View >
        </Animated.View >
      )}
      <TouchableOpacity
        className="absolute bottom-4 right-4 p-4 bg-black w-15 h-15 rounded-full items-center justify-center"
        onPress={() => {
          router.navigate(`/(tabs)/chat`)
          getGeminiResponse(`Kindly Help me decide what I should eat, just recommend few please, my today's workout stats are ${JSON.stringify(activity)}`)
          useStore.setState({ messages: [...messages, { message: "Help me choose what I should eat after today's workout", ai: false, time: new Date().toLocaleTimeString().slice(0, -3) }] })
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          speed={0.2}
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../../assets/raw/gemini.json')}
        />
      </TouchableOpacity>
    </SafeAreaView >
  )
})

export default meals