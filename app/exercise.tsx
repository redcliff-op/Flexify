import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import { useStore } from '@/src/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUtilStore } from '@/src/store/util';
import * as Progress from 'react-native-progress';

const exercise = () => {

  const animation = useRef(null);

  const {
    exerciseIntensity,
    isExercising,
    startExercise,
    currentExercise,
    exerciseData,
  } = useStore((state) => ({
    exerciseIntensity: state.exerciseIntensity,
    isExercising: state.isExercising,
    startExercise: state.startExercise,
    currentExercise: state.currentExercise,
    exerciseData: state.exerciseData
  }))

  const { displayTime, timeDiff, displayIntensity } = useUtilStore((state) => ({
    timeDiff: state.timeDiff,
    displayTime: state.displayTime,
    displayIntensity: state.displayIntensity
  }))

  const animSource = (currentExercise==='walk')?require('../assets/raw/walk.json') : require('../assets/raw/sprint.json') 

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
          <View>
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
            <View className='p-5 bg-darkgray rounded-3xl my-3 mx-1'>
              <Text className='text-white text-base'>
                Walking offers numerous benefits, including improved cardiovascular health, increased energy levels, and enhanced mood. It's a simple, low-impact exercise that can help maintain a healthy weight and reduce the risk of chronic diseases. Regular walking also promotes better sleep and strengthens muscles and bones!
              </Text>
            </View>
            <View className='p-5 bg-darkgray rounded-3xl  mx-1'>
              <Text className='text-white text-base'>
                Track the number of steps, calories burnt and distance covered!
              </Text>
            </View>
          </View>
        ) : (
          <View className='px-2 py-3'>
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
                  <Text className='text-white text-lg font-bold'>{exerciseData?.steps} <Text className='text-base font-light text-gray-300'>/ 10000</Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.steps!!) / 10000} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
              <View className='flex-row justify-between px-2 mb-2'>
                <View>
                  <Text className='text-palelime text-base'>Calories Burnt</Text>
                  <Text className='text-white text-lg font-bold'>{exerciseData?.calories} <Text className='text-base font-light text-gray-300'>/ 680 cal</Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.calories!!) / 680} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
              <View className='flex-row justify-between px-2 mb-2'>
                <View>
                  <Text className='text-palelime text-base'>Distance</Text>
                  <Text className='text-white text-lg font-bold'>{exerciseData?.distance} <Text className='text-base font-light text-gray-300'>/ 10000m</Text></Text>
                </View>
                <Progress.Bar progress={(exerciseData?.distance!!) / 10000} color='#D5FF5F' height={20} borderRadius={20} className='self-center' />
              </View>
            </View>
            <Pressable
              className='bg-darkgray rounded-3xl p-5'
              onPress={() => {
                
              }}
            >
              <Text className='text-palelime text-base self-center'>Click here for Tips!</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          className='bg-palelime rounded-3xl p-5 mx-5'
          onPress={() => {
            startExercise()
          }}
        >
          <Text className='text-black text-lg font-bold self-center'>{(isExercising) ? 'Stop!' : 'Start!'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default exercise