import { View, Text, Pressable, ScrollView, Image } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native';
import { useStore } from '@/src/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUtilStore } from '@/src/store/util';
import * as Progress from 'react-native-progress';
import Animated, { FadeIn, FadeInRight, FadeOut, FadeOutRight, LinearTransition } from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import Markdown from 'react-native-markdown-display';
import { router } from 'expo-router';

const exercise = memo(() => {

  const [geminiExpanded, setGeminiExpanded] = useState<boolean>(false)
  const [geminiResponse, setGeminiResponse] = useState<string>("")
  const [responseFetched, setResponseFetched] = useState<boolean>(false)

  const animation = useRef(null);

  const {
    exerciseIntensity,
    isExercising,
    startExercise,
    currentExercise,
    exerciseData,
    getGeminiResponse,
    geminiLoading,
    userData
  } = useStore((state) => ({
    exerciseIntensity: state.exerciseIntensity,
    isExercising: state.isExercising,
    startExercise: state.startExercise,
    currentExercise: state.currentExercise,
    exerciseData: state.exerciseData,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading,
    userData: state.userData
  }))

  const { timeDiff, displayIntensity } = useUtilStore((state) => ({
    timeDiff: state.timeDiff,
    displayTime: state.displayTime,
    displayIntensity: state.displayIntensity
  }))

  const loadGeminiResponse = async () => {
    const request = `I am going for a ${currentExercise} with intensity ${exerciseIntensity} on a scale of 1-3, 3 being high intensity and 1 being low, make me prepared and tell me anything that you feel might be helpful`;
    const response = await getGeminiResponse(request)
    setGeminiResponse(response)
  }

  const animSource = (currentExercise === 'walk') ? require('../assets/raw/walk.json') : require('../assets/raw/sprint.json')

  useEffect(() => {
    setResponseFetched(false)
  }, [exerciseIntensity, currentExercise])

  return (
    <SafeAreaView className='flex-1'>
      <LottieView
        autoPlay
        ref={animation}
        speed={exerciseIntensity}
        style={{
          width: '100%',
          height: '30%',
        }}
        source={animSource}
      />
      <View className='flex-1 bg-background rounded-t-[20] px-2 py-2 justify-between'>
        {!(isExercising) ? (
          <Animated.ScrollView
            entering={FadeInRight}
            exiting={FadeOutRight}
            showsVerticalScrollIndicator={false}
          >
            <Text className='text-white text-xl px-2 my-3'>
              Get ready for a {currentExercise}!
            </Text>
            <View className='flex-row'>
              <Pressable
                onPress={() => {
                  useStore.setState({ exerciseIntensity: 1 })
                }}
                className='py-2 px-2 mx-1 flex-auto items-center rounded-xl'
                style={{ backgroundColor: (exerciseIntensity === 1) ? '#D5FF5F' : '#2D2D36' }}
              >
                <Text
                  className='font-bold text-base'
                  style={{ color: (exerciseIntensity === 1) ? 'black' : 'white' }}
                >Slow</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  useStore.setState({ exerciseIntensity: 2 })
                }}
                className='py-2 px-2 mx-1 flex-auto items-center rounded-xl'
                style={{ backgroundColor: (exerciseIntensity === 2) ? '#D5FF5F' : '#2D2D36' }}
              >
                <Text
                  className='font-bold text-base'
                  style={{ color: (exerciseIntensity === 2) ? 'black' : 'white' }}
                >Medium</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  useStore.setState({ exerciseIntensity: 3 })
                }}
                className='py-2 px-2 mx-1 flex-auto items-center rounded-xl'
                style={{ backgroundColor: (exerciseIntensity === 3) ? '#D5FF5F' : '#2D2D36' }}
              >
                <Text
                  className='font-bold text-base'
                  style={{ color: (exerciseIntensity === 3) ? 'black' : 'white' }}
                >Fast</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                setGeminiExpanded(!geminiExpanded)
                if (!responseFetched && !geminiExpanded) {
                  loadGeminiResponse()
                  setResponseFetched(true)
                }
              }}
              className='p-5 mt-3 bg-darkgray rounded-3xl  mx-1'
            >
              <View className='flex-row justify-between'>
                {(!geminiExpanded || !geminiResponse) ? (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    className='text-white text-base'
                  >
                    Prepare yourself with FlexifyAI
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
                  className='bg-darkgray rounded-3xl  mx-1 '
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
            <View className='p-5 bg-darkgray rounded-3xl my-3 mx-1'>
              <Text className='text-white text-base'>
                Offers numerous benefits, including improved cardiovascular health, increased energy levels, and enhanced mood. It's a simple exercise that can help maintain a healthy weight and reduce the risk of chronic diseases.
              </Text>
            </View>
            <View className='p-5 bg-darkgray rounded-3xl mb-3 mx-1'>
              <Text className='text-white text-base'>
                Track the number of steps, calories burnt and distance covered!
              </Text>
            </View>
          </Animated.ScrollView>
        ) : (
          <Animated.View entering={FadeInRight} exiting={FadeOutRight} className='px-2 py-3'>
            <View className='bg-darkgray p-2 rounded-3xl justify-center mb-2'>
              <Text className='text-white mb-2 text-lg px-2'>Session Details</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View className='bg-background rounded-3xl p-8 items-center mr-2'>
                  <Text className='text-white'>Session</Text>
                  <Text className='text-palelime '>{exerciseData?.exercise}</Text>
                </View>
                <View className='bg-background rounded-3xl p-8 items-center mr-2'>
                  <Text className='text-white'>Intensity</Text>
                  <Text className='text-palelime '>{displayIntensity(exerciseData?.intensity!!)}</Text>
                </View>
                <View className='bg-background rounded-3xl p-8 items-center mr-2'>
                  <Text className='text-white'>Started</Text>
                  <Text className='text-palelime '>{timeDiff(new Date().getTime(), exerciseData?.startTime!!)}</Text>
                </View>
              </ScrollView>
            </View>
            <View className='bg-darkgray p-2 rounded-3xl justify-center mb-2'>
              <Text className='text-white mb-2 text-lg px-2'>Workout Statistics</Text>
              <View className='flex-row justify-between px-2 mb-2'>
                <View>
                  <Text className='text-palelime text-base'>Steps</Text>
                  <Text className='text-white text-lg font-bold'>{exerciseData?.steps} <Text className='text-base font-light text-gray-300'>/ {userData.stepGoal} </Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.steps!!) / 10000} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
              <View className='flex-row justify-between px-2 mb-2'>
                <View>
                  <Text className='text-palelime text-base'>Calories Burnt</Text>
                  <Text className='text-white text-lg font-bold'>{exerciseData?.calories} <Text className='text-base font-light text-gray-300'>/ {userData.caloriesGoal} cal</Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.calories!!) / 680} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
              <View className='flex-row justify-between px-2 mb-2'>
                <View>
                  <Text className='text-palelime text-base'>Distance</Text>
                  <Text className='text-white text-lg font-bold'>{exerciseData?.distance} <Text className='text-base font-light text-gray-300'>/ {userData.distanceGoal} m</Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.distance!!) / 3000} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
            </View>
            <View className='bg-darkgray rounded-3xl p-5'>
              <Text className='text-palelime text-base self-center'>Keep Going!</Text>
            </View>
          </Animated.View>
        )}
        <Pressable
          className='bg-palelime rounded-3xl p-5 mx-5 mt-2'
          onPress={() => {
            startExercise()
          }}
        >
          <Text className='text-black text-lg font-bold self-center'>{(isExercising) ? 'Stop!' : 'Start!'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
})

export default exercise