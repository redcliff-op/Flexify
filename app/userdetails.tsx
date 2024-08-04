import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React, { memo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/src/store/store'

const userdetails = memo(() => {

  const { setUserData, userData, userInfo } = useStore((state) => ({
    setUserData: state.setUserData,
    userData: state.userData,
    userInfo: state.userInfo
  }))

  const [weight, setWeight] = useState<string>(userData.weight.toString())
  const [height, setHeight] = useState<string>(userData.height.toString())
  const [steps, setSteps] = useState<string>(userData.stepGoal.toString())
  const [calories, setCalories] = useState<string>(userData.caloriesGoal.toString())
  const [distance, setDistance] = useState<string>(userData.distanceGoal.toString())

  return (
    <SafeAreaView className='flex-1 bg-background px-4 justify-between'>
      <ScrollView>
        <View className='mb-10'>
          <Text className='text-white text-xl font-bold mb-2'>Hello {userInfo?.user.givenName}!</Text>
          <Text className='text-gray-300 text-base'>Help us get to know you better so we can tailor the app and plans just for you! Share a few details, and let's make your experience uniquely yours.</Text>
        </View>
        <View>
          <Text className='text-palelime text-lg mx-2'>Weight (Kgs)</Text>
          <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
            <TextInput
              value={weight}
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
              value={height}
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
          <Text className='text-palelime text-lg mx-2'>How many calories do you wish to burn daily?</Text>
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
      </ScrollView>
      <Pressable
        className='bg-palelime rounded-3xl p-5 mx-5 mb-5'
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
        }}
      >
        <Text className='text-black text-lg font-bold self-center'>Continue</Text>
      </Pressable>
    </SafeAreaView>
  )
})

export default userdetails