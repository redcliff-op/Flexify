import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as Progress from 'react-native-progress';
import Collapsible from 'react-native-collapsible';


interface WorkoutRecordCardProps {
  exerciseData: ExerciseData
}

const WorkoutRecordCard = ({ exerciseData }: WorkoutRecordCardProps) => {

  const imageSource = (exerciseData.exercise === 'walk') ? require('../assets/icons/walk.png') : require('../assets/icons/run.png')
  const exercise = (exerciseData.exercise === 'walk') ? 'Walk' : 'Sprint'
  const intensityString: { [key: number]: string } = {
    1: 'Slow',
    2: 'Med',
    3: 'Fast'
  };

  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Pressable
      className='bg-darkgray m-2 p-2 rounded-3xl flex-row justify-between'
      onPress={() => {
        setExpanded(!expanded)
      }}
    >
      <View>
        <Collapsible collapsed={expanded} style={{ flexDirection: 'row' }}>
          <View className='rounded-full bg-black self-center p-3'>
            <Image
              source={imageSource}
              className='w-[40] h-[40]'
              tintColor={'#D5FF5F'}
            />
          </View>
          <View className='px-2 justify-center'>
            <View className='flex-row items-center'>
              <Text className='text-base text-white'>
                {exercise}
              </Text>
              <Text className='text-gray-300 ml-2 overflow-ellipsis text-sm'>
                {new Date(exerciseData.startTime!!).toLocaleString()}
              </Text>
            </View>
            <View className='flex-row mt-2'>
              <View className='p-2 mr-2 bg-black self-start rounded-lg'>
                <Text className='text-palelime'>
                  {exerciseData.distance} m
                </Text>
              </View>
              <View className='p-2 mr-2 bg-black self-start rounded-lg'>
                <Text className='text-palelime'>
                  {exerciseData.calories} cal
                </Text>
              </View>
              <View className='p-2 mr-2 bg-black self-start rounded-lg'>
                <Text className='text-palelime'>
                  {intensityString[exerciseData.intensity!!]}
                </Text>
              </View>
            </View>
          </View>
        </Collapsible>
        <Collapsible collapsed={!expanded} style={{ flexDirection: 'row' }}>
          <View className='justify-center'>
            <Progress.Circle size={150} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={(exerciseData.steps!!) / 10000} color='#D5FF5F' className='self-center' />
            <Progress.Circle size={110} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={(exerciseData.calories!!) / 680} color='#D5FF5F' className='self-center absolute' />
            <Progress.Circle size={70} strokeCap='round' unfilledColor='#656566' borderColor='transparent' thickness={15} progress={(exerciseData.distance!!) / 3000} color='#D5FF5F' className='self-center absolute' />
          </View>
          <View className='ml-3'>
            <Text className='text-palelime text-lg'>
              {exercise}
            </Text>
            <Text className='text-sm text-gray-300'>
              {new Date(exerciseData.startTime!!).toLocaleString()}
            </Text>
            <View className='flex-row mb-1 mt-3'>
              <Image
                source={require('../assets/icons/steps.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
              <Text className='text-white ml-2 text-base'>
                {exerciseData.steps} <Text className='text-gray-300'>steps</Text>
              </Text>
            </View>
            <View className='flex-row mb-1'>
              <Image
                source={require('../assets/icons/calories.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
              <Text className='text-white ml-2 text-base'>
                {exerciseData.calories} <Text className='text-gray-300'>calories</Text>
              </Text>
            </View>
            <View className='flex-row mb-1'>
              <Image
                source={require('../assets/icons/distance.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
              <Text className='text-white ml-2 text-base'>
                {exerciseData.distance} <Text className='text-gray-300'>meters</Text>
              </Text>
            </View>
            <View className='flex-row mb=1'>
              <Image
                source={require('../assets/icons/intensity.png')}
                className='w-[20] h-[20]'
                tintColor={'#D5FF5F'}
              />
              <Text className='text-white ml-2 text-base'>
                {intensityString[exerciseData.intensity!!]} <Text className='text-gray-300'>intensity</Text>
              </Text>
            </View>
          </View>
        </Collapsible>
      </View>
    </Pressable>
  )
}

export default WorkoutRecordCard