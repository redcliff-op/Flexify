import { View, Text, FlatList, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatCard from '@/components/ChatCard';
import { useStore } from '@/src/store/store';
import LottieView from 'lottie-react-native';

const chat = memo(() => {

  const { messages, getGeminiResponse, geminiLoading } = useStore((state) => ({
    messages: state.messages,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading
  }))

  const [text, setText] = useState<string>("")

  const animation = useRef(null)

  return (
    <SafeAreaView className=' justify-between flex-1 px-4 bg-background'>
      <View className='flex-initial mb-2 '>
        <Text className='mb-2 text-white text-xl font-bold'>
          Welcome to Flexify AI !
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          inverted
          className='mb-2'
          data={messages.toReversed()}
          renderItem={({ item }) => (
            <ChatCard chatItem={item}></ChatCard>
          )}
        />
      </View>
      <View className=' mb-2 flex-row items-center justify-between'>
        <View className=' mr-2 py-2.5 flex-auto border-palelime border-2 rounded-full'>
          <TextInput
            className='px-5'
            value={text}
            onChangeText={setText}
            placeholder='Ask Flexify AI!'
            placeholderTextColor={'#CBD5E0'}
            style={{ color: 'white' }}
          />
        </View>
        <Pressable
          onPress={() => {
            useStore.setState({ messages: [...messages, { message: text, ai: false, time: new Date().toLocaleTimeString().slice(0, -3) }] })
            getGeminiResponse(text)
            setText("")
          }}
        >
          {!geminiLoading ? (
            <View className='bg-black p-4 rounded-full items-center justify-center'>
              <Image
                tintColor={'#D5FF5F'}
                className='w-[20] h-[20]'
                source={require('../../assets/icons/sendicon.png')}
              />
            </View>
          ) : (
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 50,
                height: 50,
              }}
              source={require('../../assets/raw/ailoading.json')}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  )
})

export default chat