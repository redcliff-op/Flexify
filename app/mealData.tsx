import { useStore } from '@/src/store/store'
import { useUtilStore } from '@/src/store/util'
import { router } from 'expo-router'
import React, { memo, useEffect, useState } from 'react'
import { Text, Image, ScrollView, View, Pressable } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Markdown from 'react-native-markdown-display'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import YoutubePlayer from "react-native-youtube-iframe"

const mealData = memo(() => {

  const [ingredExpanded, setIngredExpanded] = useState<boolean>(false);
  const [instrucExpanded, setInstrucExpanded] = useState<boolean>(true);
  const [geminiExpanded, setGeminiExpanded] = useState<boolean>(false)
  const [geminiResponse, setGeminiResponse] = useState<string>("")
  const [responseFetched, setResponseFetched] = useState<boolean>(false)

  const { mealData, getGeminiResponse, geminiLoading } = useStore((state) => ({
    mealData: state.mealData,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading
  }));

  const { extractYtID } = useUtilStore((state) => ({
    extractYtID: state.extractYtID
  }))

  const ingredients = mealData ? (function () {
    const tempIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient?.trim() !== '' && measure) {
        tempIngredients.push({ ingredient, measure });
      }
    }
    return tempIngredients;
  })() : [];

  const loadGeminiResponse = async () => {
    const request = "Please give the nutritional values even if its not accurate in a table form for the meal " + mealData?.strMeal + " with ingredients " + JSON.stringify(ingredients);
    const response = await getGeminiResponse(request)
    setGeminiResponse(response)
    console.log(request)
  }

  useEffect(() => {
    return () => {
      useStore.setState({ mealData: null })
    }
  }, [])

  return (
    mealData ? (
      <View className='flex-1 bg-background'>
        <Animated.Image
          entering={FadeInUp}
          source={{ uri: mealData?.strMealThumb?.toString() }}
          className='w-[100%] h-[250]'
        />
        <Animated.View
          entering={FadeInDown}
          className='-mt-10 rounded-t-3xl flex-1 bg-background pt-4 px-4'>
          <ScrollView showsVerticalScrollIndicator={false} >
            <Text className=' mb-2 px-2 text-2xl font-semibold text-white'>
              {mealData?.strMeal}
            </Text>
            <View className='mb-2 flex-row items-center'>
              <View className='flex-row'>
                <View className='mr-2 rounded-2xl px-3 py-2 bg-darkgray'>
                  <Text className='text-base text-gray-200'>
                    {mealData?.strArea}
                  </Text>
                </View>
                <View className=' rounded-2xl px-3 py-2 bg-darkgray'>
                  <Text className='text-base text-gray-200'>
                    {mealData?.strCategory}
                  </Text>
                </View>
              </View>
            </View>
            <Pressable
              onPress={() => {
                setGeminiExpanded(!geminiExpanded)
                if (!responseFetched) {
                  loadGeminiResponse()
                  setResponseFetched(true)
                }
              }}
              className='p-4 mb-2 flex-row justify-between items-center bg-darkgray rounded-2xl'
            >
              <Text className='text-palelime font-semibold text-lg'>
                Nutritional Value
              </Text>
              <Image
                style={{ transform: [{ rotate: (ingredExpanded) ? '90deg' : '0deg' }] }}
                source={require('../assets/images/gemini.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
            </Pressable>
            <Collapsible collapsed={!geminiExpanded}>
              {geminiLoading ? (
                <View className='w-max rounded-2xl mb-2 p-10 bg-darkgray'>
                  <Text className='text-white font-bold'>Loading...</Text>
                </View>
              ) : (
                <View className='w-max px-3 rounded-2xl mb-2 py-2 bg-darkgray'>
                  <Markdown
                    style={{
                      body: {
                        color: 'white',
                        fontSize: 17,
                      },
                    }}
                  >
                    {geminiResponse}
                  </Markdown>
                  <Pressable
                    onPress={() => {
                      router.navigate(`/(tabs)/chat`)
                    }}
                    className='mb-2 flex-row items-center justify-between px-3 py-2 bg-palelime rounded-full'
                  >
                    <Text className='text-black font-bold text-base'>Continue In chat</Text>
                    <Image
                      className='w-[20] h-[20]'
                      tintColor={'black'}
                      source={require('../assets/icons/rightarrow.png')}
                    />
                  </Pressable>
                </View>
              )}
            </Collapsible>
            <Pressable
              onPress={() => {
                setIngredExpanded(!ingredExpanded)
              }}
              className='p-4 mb-2 flex-row justify-between items-center bg-darkgray rounded-2xl'
            >
              <Text className='text-palelime font-semibold text-lg'>
                Ingredients
              </Text>
              <Image
                style={{ transform: [{ rotate: (ingredExpanded) ? '90deg' : '0deg' }] }}
                source={require('../assets/icons/rightarrow.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
            </Pressable>
            <Collapsible collapsed={!ingredExpanded}>
              {ingredients.map((item, index) => (
                <View key={index} className='bg-darkgray mb-2 px-3 py-2 rounded-2xl'>
                  <View className=' items-center flex-row justify-between'>
                    <View>
                      <Text className='text-palelime text-base'>
                        {item.ingredient}
                      </Text>
                      <Text className='text-gray-300 text-base'>
                        {item.measure}
                      </Text>
                    </View>
                    <View className='rounded-full bg-black px-5 py-3'>
                      <Text className='text-palelime text-base'>{index}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </Collapsible>
            <Pressable
              onPress={() => {
                setInstrucExpanded(!instrucExpanded)
              }}
              className='p-4 mb-2 flex-row justify-between items-center bg-darkgray rounded-2xl'
            >
              <Text className='text-palelime font-semibold text-lg'>
                Instructions
              </Text>
              <Image
                style={{ transform: [{ rotate: (instrucExpanded) ? '90deg' : '0deg' }] }}
                source={require('../assets/icons/rightarrow.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
            </Pressable>
            <Collapsible collapsed={!instrucExpanded}>
              <View className='p-3 bg-darkgray rounded-2xl'>
                <Text className='text-gray-200 text-base'>
                  {mealData?.strInstructions}
                </Text>
              </View>
            </Collapsible>
            <YoutubePlayer
              webViewStyle={{ marginTop: 10 }}
              height={300}
              videoId={extractYtID(mealData?.strYoutube || "")}
              play={false}
            />
          </ScrollView>
        </Animated.View >
      </View >
    ) : (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className='flex-1 items-center justify-center bg-background'
      >
        <Text className='text-white text-lg font-bold'>Loading...</Text>
      </Animated.View>
    )
  )
})

export default mealData
