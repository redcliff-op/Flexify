import { useAuthStore } from '@/src/stores/authStore'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {

  const userInfo = useAuthStore.getState().userInfo

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <Text className='text-white text-3xl'>{userInfo?.user.email}</Text>
    </SafeAreaView>
  )
}

export default index