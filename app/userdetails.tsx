import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/src/store/store'
import LottieView from 'lottie-react-native'
import Markdown from 'react-native-markdown-display'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import Collapsible from 'react-native-collapsible'
import { router } from 'expo-router'

const userdetails = memo(() => {

  const { setUserData, userData, getGeminiResponse, geminiLoading } = useStore((state) => ({
    setUserData: state.setUserData,
    userData: state.userData,
    userInfo: state.userInfo,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading
  }))

  const animation = useRef(null)

  const [weight, setWeight] = useState<string>(userData.weight.toString())
  const [height, setHeight] = useState<string>(userData.height.toString())
  const [steps, setSteps] = useState<string>(userData.stepGoal.toString())
  const [calories, setCalories] = useState<string>(userData.caloriesGoal.toString())
  const [distance, setDistance] = useState<string>(userData.distanceGoal.toString())
  const [geminiResponse, setGeminiResponse] = useState<string>("")
  const [responseFetched, setResponseFetched] = useState<boolean>(false)
  const [geminiExpanded, setGeminiExpanded] = useState<boolean>(false)

  const loadGeminiResponse = async () => {
    const request = `Whats a good daily step, calorie burn and distance target in meteres for a normal adult ?`;
    const response = await getGeminiResponse(request)
    setGeminiResponse(response)
  }

  return (
    <SafeAreaView className='flex-1 bg-background px-4 justify-between'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: '100%',
              height: 300,
            }}
            source={require('../assets/raw/meditation.json')}
          />
          <Text className='text-white text-3xl font-extralight mb-10 px-2'>Lets get to know you and your goals!</Text>
          <Text className='text-palelime text-lg mx-2'>Weight (Kgs)</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={(weight==='0')?'':weight}
              className='flex-1'
              onChangeText={setWeight}
              placeholder="Enter your Weight (KGs)"
              style={{ color: 'white' }}
              placeholderTextColor="white"
              multiline={false}
              keyboardType='numeric'
            />
          </View>
          <Text className='text-palelime text-lg mx-2'>Height (cms)</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={(height==='0'?'':height)}
              className='flex-1'
              onChangeText={setHeight}
              placeholder="Enter your Height (CMs)"
              style={{ color: 'white' }}
              placeholderTextColor="white"
              multiline={false}
              keyboardType='numeric'
            />
          </View>
          <Text className='text-palelime text-lg mx-2'>What's your daily step goal?</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={steps}
              className='flex-1'
              onChangeText={setSteps}
              placeholder="Enter your Height (CMs)"
              style={{ color: 'white' }}
              placeholderTextColor="white"
              multiline={false}
              keyboardType='numeric'
            />
          </View>
          <Text className='text-palelime text-lg mx-2'>How about a daily calorie target?</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={calories}
              className='flex-1'
              onChangeText={setCalories}
              placeholder="Enter your Height (CMs)"
              style={{ color: 'white' }}
              placeholderTextColor="white"
              multiline={false}
              keyboardType='numeric'
            />
          </View>
          <Text className='text-palelime text-lg mx-2'>What's your daily distance target? (m)</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={distance}
              className='flex-1'
              onChangeText={setDistance}
              placeholder="Enter your Height (CMs)"
              style={{ color: 'white' }}
              placeholderTextColor="white"
              multiline={false}
              keyboardType='numeric'
            />
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
          className='p-5 mt-3 bg-darkgray rounded-3xl'
        >
          <View className='flex-row justify-between items-center'>
            {(!geminiExpanded || !geminiResponse) ? (
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                className='text-white text-base'
              >
                Not sure about what to aim for? {'\n'}
                Try Flexify AI ! 
              </Animated.Text>
            ) : null}
            <Animated.View layout={LinearTransition}>
              <LottieView
                autoPlay
                ref={animation}
                speed={0.5}
                style={{
                  width: 30,
                  height: 30,
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
                </View>
              )}
            </Animated.View>
          </Collapsible>
        </Pressable>
        <Pressable
          className='bg-palelime rounded-3xl p-5 mt-5 mb-20'
          onPress={() => {
            useStore.setState({
              userData:
              {
                weight: parseFloat(weight),
                height: parseFloat(height),
                stepGoal: parseFloat(steps),
                caloriesGoal: parseFloat(calories),
                distanceGoal: parseFloat(distance)
              }
            })
            setUserData()
            router.back()
          }}
        >
          <Text className='text-black text-lg font-bold self-center'>Continue</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
})

export default userdetails