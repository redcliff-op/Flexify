import React, { useEffect, useState } from 'react'
import { Alert, AppState, AppStateStatus, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { router } from 'expo-router';
import { useStore } from '@/src/store/store';
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight, LinearTransition } from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';

const index = () => {

  const { activity, userInfo, stopStepCounter, isExercising, currentExercise, updateDailyStats, activityList, exerciseRecord } = useStore((state) => ({
    activity: state.activity,
    userInfo: state.userInfo,
    startStepCounter: state.startStepCounter,
    stopStepCounter: state.stopStepCounter,
    isExercising: state.isExercising,
    currentExercise: state.currentExercise,
    updateDailyStats: state.updateDailyStats,
    activityList: state.activityList.toReversed(),
    exerciseRecord: state.exerciseRecord
  }))

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [pastActivity, setPastActivity] = useState<Activity>({ steps: 0, caloriesBurnt: 0, distance: 0 })
  const [totalWalkDistance, setTotalWalkDistance] = useState<number>(0)
  const [totalSprintDistance, setTotalSprintDistance] = useState<number>(0)

  const setupExerciseStats = async () => {
    const todaysRecord = exerciseRecord.filter((record: ExerciseData) =>
      moment(record.startTime).isSame(moment(), 'day'))
    let wDistance = 0
    let sDistance = 0
    for (const record of todaysRecord ) {
      if (record.exercise === 'walk') {
        wDistance += record.distance!!
      } else {
        sDistance += record.distance!!
      }
    }
    setTotalWalkDistance(parseFloat((wDistance/1000).toFixed(2)))
    setTotalSprintDistance(parseFloat((sDistance/1000).toFixed(2)))
  }

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

  useEffect(() => {
    setupExerciseStats()
  }, [isExercising])

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
            <Progress.Bar progress={((!isExpanded) ? activity.steps : pastActivity.steps) / 10000} color='#D5FF5F' height={20} borderRadius={20} className='mx-3 self-center' />
          </View>
        </View>
        <View
          className='bg-darkgray mt-2 p-5'
          style={{ borderRadius: 40, overflow: 'hidden' }}
        >
          <Text className='text-white text-lg'>
            {isExpanded ? 'All Reports' : 'Daily Report'}
          </Text>
          <View className='flex-row' style={{ justifyContent: (!isExpanded) ? 'space-between' : 'center' }}>
            {!(isExpanded) ? (
              <Animated.View
                entering={FadeInLeft}
                exiting={FadeOutLeft}
              >
                <Text className=' text-gray-300 mt-2'>Steps</Text>
                <Text className='text-palelime text-lg font-bold'>{activity.steps} <Text className='text-base font-light text-palelime'>/ 10000</Text></Text>
                <Text className=' text-gray-300 mt-2'>Calories</Text>
                <Text className='text-palelime text-lg font-bold'>{activity.caloriesBurnt} <Text className='text-base font-light text-palelime'>/ 680 Cal</Text></Text>
                <Text className=' text-gray-300 mt-2'>Distance</Text>
                <Text className='text-palelime text-lg font-bold'>{activity.distance} <Text className='text-base font-light text-palelime'>/ 3000 m</Text></Text>
              </Animated.View>
            ) : null}
            <Animated.View layout={LinearTransition}>
              <Pressable
                onPress={() => {
                  if (!isExpanded) {
                    setPastActivity(activity)
                  }
                  setIsExpanded(!isExpanded)
                }}
                className='justify-center'
              >
                <Progress.Circle size={160} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.steps : pastActivity.steps) / 10000} color='#D5FF5F' className='self-center' />
                <Progress.Circle size={120} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.caloriesBurnt : pastActivity.caloriesBurnt) / 680} color='#D5FF5F' className='self-center absolute' />
                <Progress.Circle size={80} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.distance : pastActivity.distance) / 3000} color='#D5FF5F' className='self-center absolute' />
              </Pressable>
            </Animated.View>
          </View>
          <Collapsible collapsed={!isExpanded}>
            <Animated.Text entering={FadeInRight} exiting={FadeOutRight} className='self-center my-3 text-white text-base font-bold'>{monthsOfYear[new Date(pastActivity.date!!).getMonth() - 1]} {new Date(activity.date!!).getFullYear()}</Animated.Text>
            <Animated.FlatList
              entering={FadeInLeft}
              exiting={FadeOutLeft}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityList}
              renderItem={({ item }) =>
                <Pressable
                  onPress={() => {
                    setPastActivity(item)
                  }}
                  className='bg-black py-2 px-4 mx-1 rounded-3xl items-center'
                  style={{ backgroundColor: (pastActivity.date === item.date) ? '#D5FF5F' : 'black' }}
                >
                  <Text
                    className='text-base'
                    style={{ color: (pastActivity.date === item.date) ? 'black' : 'white' }}
                  >
                    {daysOfWeek[new Date(item.date!!).getDay()]}
                  </Text>
                  <Text
                    className='text-base font-bold'
                    style={{ color: (pastActivity.date === item.date) ? 'black' : 'white' }}
                  >
                    {item.date?.slice(-2)}
                  </Text>
                </Pressable>
              }
            >
            </Animated.FlatList>
            <Animated.View
              entering={FadeInRight}
              exiting={FadeOutRight}
              className='flex-row justify-evenly items-center'
            >
              <View>
                <Text className=' text-gray-300 mt-2'>Steps</Text>
                <Text className='text-palelime text-lg font-bold'>{((!isExpanded) ? activity.steps : pastActivity.steps)}</Text>
                <Text className='text-sm font-light text-palelime'>/ 10000</Text>
              </View>
              <View>
                <Text className=' text-gray-300 mt-2'>Calories</Text>
                <Text className='text-palelime text-lg font-bold'>{((!isExpanded) ? activity.caloriesBurnt : pastActivity.caloriesBurnt)}</Text>
                <Text className='text-sm font-light text-palelime'>/ 680 Cal</Text>
              </View>
              <View>
                <Text className=' text-gray-300 mt-2'>Distance</Text>
                <Text className='text-palelime text-lg font-bold'>{((!isExpanded) ? activity.distance : pastActivity.distance)}</Text>
                <Text className='text-sm font-light text-palelime'>/ 3000 m</Text>
              </View>
            </Animated.View>
          </Collapsible>
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
                <Text className='text-white text-lg font-bold'>{totalWalkDistance} Km</Text>
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
                <Text className='text-white text-lg font-bold'>{totalSprintDistance} Km</Text>
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