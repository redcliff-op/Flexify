import { View, Text, Image } from 'react-native'
import React from 'react'

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

  return (
    <View className='bg-darkgray m-2 p-2 rounded-2xl flex-row justify-between'>
      <View className='flex-row'>
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
      </View>
      <Image
        source={require('../assets/icons/rightarrow.png')}
        className='w-[25] h-[25] self-center'
        tintColor={'white'}
      />
    </View>
  )
}

export default WorkoutRecordCard