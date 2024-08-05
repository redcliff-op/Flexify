import { useStore } from '@/src/store/store'
import { useUtilStore } from '@/src/store/util'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Text, Image, ScrollView, View, Pressable } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Markdown from 'react-native-markdown-display'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp, LinearTransition } from 'react-native-reanimated'
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
  }

  useEffect(() => {
    return () => {
      useStore.setState({ mealData: null })
    }
  }, [])

  const animation = useRef(null);

  return (
    mealData ? (
      <Animated.View
        className=' flex-1 bg-background px-2'>
        <ScrollView showsVerticalScrollIndicator={false} >
          <Animated.Image
            entering={FadeInUp}
            source={{ uri: mealData?.strMealThumb?.toString() }}
            className='rounded-b-[40] w-[100%] self-center h-[250] mb-2 opacity-80'
          />
          <Animated.View entering={FadeInDown}>
            <View className='bg-darkgray rounded-t-[40] mb-2 rounded-b-[40] p-4'>
              <Text className=' mb-2 px-2 text-2xl font-medium text-white'>
                {mealData?.strMeal}
              </Text>
              <View className=' flex-row items-center px-2 mb-2'>
                <View className='flex-row'>
                  <View className='mr-2 rounded-xl border-palelime px-3 py-2 bg-black' style={{ borderWidth: 1 }}>
                    <Text className='text-base text-gray-200'>
                      {mealData?.strArea}
                    </Text>
                  </View>
                  <View className=' rounded-xl px-3 py-2 border-palelime bg-black' style={{ borderWidth: 1 }}>
                    <Text className='text-base text-gray-200'>
                      {mealData?.strCategory}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable
              onPress={() => {
                setGeminiExpanded(!geminiExpanded)
                if (!responseFetched && !geminiExpanded) {
                  loadGeminiResponse()
                  setResponseFetched(true)
                }
              }}
              className='p-4 mb-2 bg-darkgray rounded-t-[40] rounded-b-[40]'
            >
              <View className='flex-row justify-between items-center'>
                {(!geminiExpanded || !geminiResponse) ? (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    className=' px-2 py-2 text-palelime font-semibold text-lg'
                  >
                    Get Nutritional Value
                  </Animated.Text>
                ) : null}
                <Animated.View layout={LinearTransition}>
                  <LottieView
                    autoPlay
                    ref={animation}
                    speed={0.5}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={require('../assets/raw/gemini.json')}
                  />
                </Animated.View>
              </View>
              <Collapsible collapsed={!geminiExpanded}>
                <Animated.View
                  className='bg-darkgray rounded-3xl mt-2 mx-1 '
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  {geminiLoading ? (
                    <View className='w-max items-center justify-center rounded-2xl mb-2 p-10 bg-darkgray'>
                      <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                          width: 200,
                          height: 200,
                        }}
                        source={require('../assets/raw/ailoading.json')}
                      />
                    </View>
                  ) : (
                    <View className='w-max rounded-2xl mb-2 bg-darkgray'>
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
                        className='flex-row items-center justify-between px-3 py-2 bg-palelime rounded-full'
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
                </Animated.View>
              </Collapsible>
            </Pressable>
            <Pressable
              onPress={() => {
                setInstrucExpanded(!instrucExpanded)
              }}
              className='p-4 mb-2 justify-between bg-darkgray rounded-t-[40] rounded-b-[40]'
            >
              <View className=' p-2 flex-row items-center justify-between'>
                <Text className='text-palelime font-semibold text-lg'>
                  Instructions
                </Text>
                <Image
                  style={{ transform: [{ rotate: (instrucExpanded) ? '90deg' : '0deg' }] }}
                  source={require('../assets/icons/rightarrow.png')}
                  className='w-[20] h-[20]'
                  tintColor={'#D5FF5F'}
                />
              </View>
              <Collapsible collapsed={!instrucExpanded}>
                <View className='p-3 bg-darkgray rounded-2xl'>
                  <Text className='text-gray-200 text-base'>
                    {mealData?.strInstructions}
                  </Text>
                </View>
              </Collapsible>
            </Pressable>
            <Pressable
              onPress={() => {
                setIngredExpanded(!ingredExpanded)
              }}
              className='py-4 mb-2 justify-between bg-darkgray rounded-t-[40] rounded-b-[40]'
            >
              <View className='px-6 py-2 first-letter:flex-row items-center justify-between'>
                <Text className=' text-palelime font-semibold text-lg'>
                  Ingredients
                </Text>
                <Image
                  style={{ transform: [{ rotate: (ingredExpanded) ? '90deg' : '0deg' }] }}
                  source={require('../assets/icons/rightarrow.png')}
                  className='w-[20] h-[20]'
                  tintColor={'#D5FF5F'}
                />
              </View>
              <Collapsible collapsed={!ingredExpanded}>
                <View className='my-1'></View>
                {ingredients.map((item, index) => (
                  <View key={index} className='bg-background mx-2 mb-2 px-2 py-3 rounded-3xl'>
                    <View className=' items-center flex-row justify-between'>
                      <View className='flex-row'>
                        <Image
                          className='w-[60] h-[60] mr-2'
                          source={{ uri: `https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png` }}
                        />
                        <View>
                          <Text className='text-palelime text-base'>
                            {item.ingredient}
                          </Text>
                          <Text className='text-gray-300 text-base'>
                            {item.measure}
                          </Text>
                        </View>
                      </View>
                      <View className='rounded-full bg-black px-5 py-3'>
                        <Text className='text-palelime text-base'>{index+1}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </Collapsible>
            </Pressable>
            <YoutubePlayer
              webViewStyle={{ marginTop: 10 }}
              height={300}
              videoId={extractYtID(mealData?.strYoutube || "")}
              play={false}
            />
          </Animated.View>
        </ScrollView>
      </Animated.View >
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
