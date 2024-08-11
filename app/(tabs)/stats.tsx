import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/src/store/store'
import WorkoutRecordCard from '@/components/WorkoutRecordCard'
import moment from 'moment'

const Stats = () => {
  const [date, setDate] = useState<string>("today")
  const { exerciseRecord } = useStore((state) => ({
    exerciseRecord: state.exerciseRecord
  }))
  const todayDate = moment().startOf('day')
  const filteredExerciseRecord = exerciseRecord.filter(record => {
    const recordDate = moment(record.startTime).startOf('day')
    if (date === 'today') {
      return recordDate.isSame(todayDate, 'day')
    } else {
      return recordDate.isBefore(todayDate, 'day')
    }
  })

  return (
    <SafeAreaView className='flex-1 px-2 bg-background'>
      <Text className='text-white text-xl px-2 font-bold'>Stats!</Text>
      <Text className='text-gray-300 text-base px-2 '>View your Past Workout History</Text>
      <View className='flex-row mt-2 justify-center'>
        <Pressable
          onPress={() => {
            setDate('today')
          }}
          className='py-3 items-center mx-2 flex-auto px-5 rounded-2xl'
          style={{ backgroundColor: (date === 'today') ? '#D5FF5F' : '#2D2D36' }}
        >
          <Text
            style={{ color: (date === 'today') ? 'black' : 'white' }}
            className='text-base font-bold'
          >
            Today
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setDate('past')
          }}
          className='py-3 items-center mx-2 flex-auto px-5 rounded-2xl'
          style={{ backgroundColor: (date !== 'today') ? '#D5FF5F' : '#2D2D36' }}
        >
          <Text
            style={{ color: (date !== 'today') ? 'black' : 'white' }}
            className='text-base font-bold'
          >
            Past
          </Text>
        </Pressable>
      </View>
      {(filteredExerciseRecord.length > 0) ? (
        <FlatList
          className='mt-2'
          data={filteredExerciseRecord}
          keyExtractor={(item) => item.startTime?.toString()!!}
          renderItem={({ item }) => (
            <WorkoutRecordCard
              exerciseData={item}
            />
          )}
        />
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-white text-base font-bold'>No Data Available</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Stats
