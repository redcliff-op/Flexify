import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Alert, AppState, AppStateStatus, BackHandler, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { router, useFocusEffect } from 'expo-router';
import { useStore } from '@/src/store/store';
import Animated, { FadeInLeft, FadeOutLeft, LinearTransition } from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import { Activity, ExerciseData } from '@/global';
import MealCard from '@/components/MealCard';

const index = memo(() => {

  const { meals, fetchIngred, userData, activity, userInfo, stopStepCounter, isExercising, currentExercise, updateDailyStats, activityList, exerciseRecord } = useStore((state) => ({
    activity: state.activity,
    userInfo: state.userInfo,
    startStepCounter: state.startStepCounter,
    stopStepCounter: state.stopStepCounter,
    isExercising: state.isExercising,
    currentExercise: state.currentExercise,
    updateDailyStats: state.updateDailyStats,
    activityList: state.activityList.toReversed(),
    exerciseRecord: state.exerciseRecord,
    userData: state.userData,
    meals: state.meals,
    fetchIngred: state.fetchIngred
  }))

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [pastActivity, setPastActivity] = useState<Activity>({ steps: 0, caloriesBurnt: 0, distance: 0 })
  const [totalWalkDistance, setTotalWalkDistance] = useState<number>(0)
  const [totalSprintDistance, setTotalSprintDistance] = useState<number>(0)

  const setupExerciseStats = useCallback(async () => {
    const todaysRecord = exerciseRecord.filter((record: ExerciseData) =>
      moment(record.startTime).isSame(moment(), 'day'))
    let wDistance = 0
    let sDistance = 0
    for (const record of todaysRecord) {
      if (record.exercise === 'walk') {
        wDistance += record.distance!!
      } else {
        sDistance += record.distance!!
      }
    }
    setTotalWalkDistance(parseFloat((wDistance / 1000).toFixed(2)))
    setTotalSprintDistance(parseFloat((sDistance / 1000).toFixed(2)))
  }, []);

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
      stopStepCounter();
    };
  }, []);

  useEffect(() => {
    setupExerciseStats();
  }, [isExercising]);

  useEffect(() => {
    fetchIngred("Salmon")
  }, [])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <SafeAreaView className='flex-1 bg-background px-2 py-2 align-middle'>
      <Collapsible easing={'linear'} collapsed={!isExpanded} style={{ paddingVertical: 20, borderRadius: 40, backgroundColor: '#2D2D36' }}>
        {(activityList.length > 0) ? (
          <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={activityList}
            className='mx-3'

            renderItem={({ item, index }) =>
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
        ) : (
          <View >
            <Text className='text-white font-bold text-center text-base'>No Past Data Available</Text>
          </View>
        )}
      </Collapsible>
      <ScrollView style={{ marginTop: isExpanded ? 10 : 0 }}>
        <Collapsible duration={600} easing={'linear'} collapsed={isExpanded}>
          <View className='flex-row mb-5 justify-between'>
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
        </Collapsible>
        <View
          className=' bg-darkgray p-5'
          style={{ borderRadius: 40 }}
        >
          <Text className='text-white text-lg'>Steps</Text>
          <View className='flex-row justify-between'>
            <Text className='text-white text-lg font-bold'>{activity.steps} <Text className='text-base font-light text-gray-300'>/ {userData.stepGoal}</Text></Text>
            <Progress.Bar progress={((!isExpanded) ? activity.steps : pastActivity.steps) / userData.stepGoal} color='#D5FF5F' height={20} borderRadius={20} className='mx-3 self-center' />
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
                <Text className='text-palelime text-lg font-bold'>{activity.steps} <Text className='text-base font-light text-palelime'>/ {userData.stepGoal}</Text></Text>
                <Text className=' text-gray-300 mt-2'>Calories</Text>
                <Text className='text-palelime text-lg font-bold'>{activity.caloriesBurnt} <Text className='text-base font-light text-palelime'>/ {userData.caloriesGoal} Cal</Text></Text>
                <Text className=' text-gray-300 mt-2'>Distance</Text>
                <Text className='text-palelime text-lg font-bold'>{activity.distance} <Text className='text-base font-light text-palelime'>/ {userData.distanceGoal} m</Text></Text>
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
                <Progress.Circle size={160} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.steps : pastActivity.steps) / userData.stepGoal} color='#D5FF5F' className='self-center' />
                <Progress.Circle size={120} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.caloriesBurnt : pastActivity.caloriesBurnt) / userData.caloriesGoal} color='#D5FF5F' className='self-center absolute' />
                <Progress.Circle size={80} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={((!isExpanded) ? activity.distance : pastActivity.distance) / userData.distanceGoal} color='#D5FF5F' className='self-center absolute' />
              </Pressable>
            </Animated.View>
          </View>
          <Collapsible collapsed={!isExpanded}>
            <Text className='self-center mt-3 text-white text-base font-bold'>{monthsOfYear[new Date(pastActivity.date!!).getMonth() - 1]}</Text>
            <View className='flex-row justify-evenly items-center'>
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
            </View>
            <Pressable
              onPress={() => {
                router.navigate(`/statGraphs`)
              }}
              className='flex-row justify-between bg-background rounded-full mt-5 py-3 px-5'>
              <Text className='text-lg text-palelime text-center'>
                Past Record Graphs
              </Text>
              <Image
                source={require('../../assets/icons/rightarrow.png')}
                className='w-[25] h-[25] self-center'
                tintColor={'white'}
              />
            </Pressable>
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
          <Pressable
            onPress={() => {
              Alert.alert('Coming Soon!','Work in progress feature')
            }}  
            className='p-2 mx-2 mt-1 justify-between bg-background rounded-full flex-row'
          >
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
          </Pressable>
        </View>
        <View
          className='bg-darkgray mt-2 py-5'
          style={{ borderRadius: 40 }}
        >
          <View className='flex-row items-center justify-between'>
            <Text className='text-white text-lg px-5'>Meals</Text>
            <Pressable
              onPress={() => {
                router.navigate(`/(tabs)/meals`)
              }}
            >
              <Text className='text-palelime text-lg px-5'>View all</Text>
            </Pressable>
          </View>
          <FlatList
            className='m-2'
            data={meals}
            keyExtractor={(item) => item.strMealThumb}
            renderItem={({ item }) => (
              <MealCard meal={item} style={{ aspectRatio: 1 }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
          </FlatList>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
})

export default index