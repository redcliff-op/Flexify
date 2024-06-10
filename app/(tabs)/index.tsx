import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-background'>
      <Text className='text-white text-3xl'>One</Text>
    </SafeAreaView>
  )
}

export default index