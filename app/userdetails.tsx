import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/src/store/store'

const userdetails = () => {

  const [weight, setWeight] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const {setUserData} = useStore((state)=>({
    setUserData: state.setUserData
  }))
  return (
    <SafeAreaView className='flex-1 bg-background p-2 justify-between'>
      <Text className='text-white text-lg text-center font-bold'>Please Enter your Weight and Height</Text>
      <View>
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
        <View className="bg-darkgray my-1 h-[70] rounded-3xl px-5">
          <TextInput
            value={height}
            className='flex-1'
            onChangeText={setHeight}
            placeholder="Enter your Height (CMs)"
            style={{ color: 'white'}}
            placeholderTextColor="white"
            multiline={false}
            keyboardType='numeric'
          />
        </View>
      </View>
      <Pressable
        className='bg-palelime rounded-3xl p-5 mx-5 mb-5'
        onPress={() => {
          useStore.setState({userData:{weight:parseFloat(weight), height: parseFloat(height)}})
          setUserData()
        }}
      >
        <Text className='text-black text-lg font-bold self-center'>Continue</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default userdetails