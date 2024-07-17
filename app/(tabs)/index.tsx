import React, { useEffect } from 'react'
import { Alert, AppState, AppStateStatus, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { router } from 'expo-router';
import { useStore } from '@/src/store/store';

const index = () => {

  const { userInfo } = useStore((state) => ({
    userInfo: state.userInfo
  }))
  const { activity, stopStepCounter, isExercising, currentExercise, updateDailyStats } = useStore((state) => ({
    activity: state.activity,
    startStepCounter: state.startStepCounter,
    stopStepCounter: state.stopStepCounter,
    isExercising: state.isExercising,
    currentExercise: state.currentExercise,
    updateDailyStats: state.updateDailyStats
  }))

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        updateDailyStats();
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [updateDailyStats]);

  useEffect(() => {
    return () => {
      stopStepCounter()
    }
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-background px-2 py-2 align-middle'>
      <ScrollView>
        <View className='flex-row justify-between'>
          <View className='flex-row px-2'>
            <Pressable
              className='self-center'
              onPress={() => {
                router.navigate(`/profile`)
              }}
            >
              <Image
                source={{ uri: userInfo?.user.photo?.toString() }}
                className='w-[55] h-[55] rounded-full'
              />
            </Pressable>
            <View className='ml-3'>
              <Text className='text-white text-lg font-bold'>
                Welcome {userInfo?.user.givenName}!
              </Text>
              <Text className='text-white text-base'>
                Let's start your day
              </Text>
            </View>
          </View>
          <Pressable
            className='self-center'
            onPress={() => {
              router.navigate(`/profile`)
            }}
          >
            <Image
              source={require('../../assets/icons/profile.png')}
              className='self-center w-[25] h-[25] mr-2'
              tintColor={'#D5FF5F'}
            />
          </Pressable>
        </View>
        <View
          className=' bg-darkgray mt-5 p-5'
          style={{ borderRadius: 40 }}
        >
          <Text className='text-white text-lg'>Steps</Text>
          <View className='flex-row justify-between'>
            <Text className='text-white text-lg font-bold'>{activity.steps} <Text className='text-base font-light text-gray-300'>/ 10000</Text></Text>
            <Progress.Bar progress={activity.steps / 10000} color='#D5FF5F' height={20} borderRadius={20} className='mx-3 self-center' />
          </View>
        </View>
        <View
          className='bg-darkgray mt-2 p-5'
          style={{ borderRadius: 40 }}
        >
          <Text className='text-white text-lg'>Daily Activity</Text>
          <View className='flex-row justify-between'>
            <View>
              <Text className=' text-gray-300 mt-2'>Steps</Text>
              <Text className='text-palelime text-lg font-bold'>{activity.steps} <Text className='text-base font-light text-palelime'>/ 10000</Text></Text>
              <Text className=' text-gray-300 mt-2'>Calories</Text>
              <Text className='text-palelime text-lg font-bold'>{activity.caloriesBurnt} <Text className='text-base font-light text-palelime'>/ 680 Cal</Text></Text>
              <Text className=' text-gray-300 mt-2'>Distance</Text>
              <Text className='text-palelime text-lg font-bold'>{activity.distance} <Text className='text-base font-light text-palelime'>/ 3000 m</Text></Text>
            </View>
            <View className='justify-center'>
              <Progress.Circle size={150} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={activity.steps / 10000} color='#D5FF5F' className='self-center' />
              <Progress.Circle size={110} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={activity.caloriesBurnt / 680} color='#D5FF5F' className='self-center absolute' />
              <Progress.Circle size={70} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={activity.distance / 3000} color='#D5FF5F' className='self-center absolute' />
            </View>
          </View>
        </View>
        <View
          className='bg-darkgray mt-2 py-5'
          style={{ borderRadius: 40 }}
        >
          <Text className='text-white text-lg px-5'>Workouts</Text>
          <Pressable
            className='p-2 mx-2 mt-2 justify-between bg-background rounded-full flex-row'
            onPress={() => {
              if (isExercising && currentExercise !== 'walk') {
                Alert.alert(
                  'Another Workout Session Already Active!',
                  'Please Stop the Previous Session before starting a new one'
                )
              } else {
                useStore.setState({ currentExercise: 'walk' })
                router.navigate(`/exercise`)
              }
            }}
          >
            <View className='flex-row'>
              <View className='rounded-full bg-black self-center p-3'>
                <Image
                  source={require('../../assets/icons/walk.png')}
                  className='w-[25] h-[25]'
                  tintColor={'#D5FF5F'}
                />
              </View>
              <View className='px-2'>
                <Text className='text-gray-300'>Walk</Text>
                <Text className='text-white text-lg font-bold'>2.44 Km</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/icons/rightarrow.png')}
              className='w-[25] h-[25] self-center'
              tintColor={'white'}
            />
          </Pressable>
          <Pressable
            className='p-2 mx-2 mt-1 justify-between bg-background rounded-full flex-row'
            onPress={() => {
              if (isExercising && currentExercise !== 'sprint') {
                Alert.alert(
                  'Another Workout Session Already Active!',
                  'Please Stop the Previous Session before starting a new one'
                )
              } else {
                useStore.setState({ currentExercise: 'sprint' })
                router.navigate(`/exercise`)
              }
            }}
          >
            <View className='flex-row'>
              <View className='rounded-full bg-black self-center p-3'>
                <Image
                  source={require('../../assets/icons/run.png')}
                  className='w-[25] h-[25]'
                  tintColor={'#D5FF5F'}
                />
              </View>
              <View className='px-2'>
                <Text className='text-gray-300'>Sprint</Text>
                <Text className='text-white text-lg font-bold'>3.79 Km</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/icons/rightarrow.png')}
              className='w-[25] h-[25] self-center'
              tintColor={'white'}
            />
          </Pressable>
          <View className='p-2 mx-2 mt-1 justify-between bg-background rounded-full flex-row'>
            <View className='flex-row'>
              <View className='rounded-full bg-black self-center p-3'>
                <Image
                  source={require('../../assets/icons/swim.png')}
                  className='w-[25] h-[25]'
                  tintColor={'#D5FF5F'}
                />
              </View>
              <View className='px-2'>
                <Text className='text-gray-300'>Swim</Text>
                <Text className='text-white text-lg font-bold'>1.21 Km</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/icons/rightarrow.png')}
              className='w-[25] h-[25] self-center'
              tintColor={'white'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default index