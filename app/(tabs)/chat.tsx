import { View, Text, FlatList, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatCard from '@/components/ChatCard';
import { useStore } from '@/src/store/store';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';
import ChatQuickAccessCard from '@/components/ChatQuickAccessCard';
import * as ImagePicker from 'expo-image-picker';
import Collapsible from 'react-native-collapsible';

const chat = memo(() => {

  const { userInfo, messages, getGeminiResponse, geminiLoading } = useStore((state) => ({
    messages: state.messages,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading,
    userInfo: state.userInfo
  }))

  const textInputRef = useRef(null);
  const [text, setText] = useState<string>("")
  const [image, setImage] = useState<string | null>(null)
  const [kbFocused, setKbFocused] = useState<boolean>(false)

  const loadImage = async () => {
    const result = await ImagePicker.launchCameraAsync()
    setImage(result.assets!![0].uri)
  }

  const animation = useRef(null)

  const handleUnfocus = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
      setKbFocused(false);
    }
  };

  return (
    <SafeAreaView className=' justify-between flex-1 px-4 bg-background'>
      <View className='flex-initial mb-2 '>
        <View className='flex-row justify-between items-center'>
          <View>
            <Text className='mb text-white text-xl font-bold'>Flexify AI !</Text>
            <Text className='text-gray-300 mb-2 text-base'>Ask my Anything!</Text>
          </View>
          <Pressable
            onPress={() => {
              useStore.setState({ messages: [] })
              handleUnfocus()
            }}
          >
            <Image
              className='w-[30] h-[30]'
              tintColor={'#D5FF5F'}
              source={require('../../assets/icons/reseticon.png')}
            />
          </Pressable>
        </View>
        {(messages?.length !== 0) ? (
          <Animated.FlatList
            entering={FadeIn}
            exiting={FadeOut}
            showsVerticalScrollIndicator={false}
            inverted
            className='mb-2'
            data={messages.toReversed()}
            renderItem={({ item }) => (
              <ChatCard chatItem={item}></ChatCard>
            )}
          />
        ) : null}
      </View>
      {(messages?.length === 0 && !geminiLoading && !kbFocused && !image) ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 justify-center'
        >
          <Text className='px-2 text-palelime text-4xl font-extralight text-bold'>Hello {userInfo?.user.givenName}!</Text>
          <Text className='px-2 text-white text-lg'>Need Help or Motivation? Ask me about exercise routines, meal plans, or any fitness questions! </Text>
          <View className='flex-row mt-10'>
            <ChatQuickAccessCard heading={'Workout Plan'} desc={'Get a 7 day Workout Plan!'} index={0} />
            <ChatQuickAccessCard heading={'Diet Plan'} desc={`Get a full day Diet Plan based on today's progress!`} index={1} />
          </View>
          <View className='flex-row'>
            <ChatQuickAccessCard heading={'Progress Review'} desc={'Check and Review your last 10 days of Progress!'} index={2} />
            <ChatQuickAccessCard heading={'Exercise Tips'} desc={`Get tips on how to perform exercises correctly!`} index={3} />
          </View>
        </Animated.View>
      ) : null}
      {(messages?.length === 0 && geminiLoading) ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 justify-center items-center'
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../assets/raw/ailoading.json')}
          />
        </Animated.View>
      ) : null}
      <View className=' mb-2  justify-between'>
        <Collapsible collapsed={!image}>
          <Animated.Image
            entering={FadeIn}
            exiting={FadeOut}
            borderRadius={20}
            source={{ uri: image?.toString() }}
            className='w-[90%] mb-5 self-center h-[300]'
          />
        </Collapsible>
        <View className='flex-row items-center'>
          {image ? (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOutDown}
              className='flex-auto flex-row mr-2 items-center justify-between bg-darkgray rounded-full'
            >
              <Text className='text-white text-base p-5'>
                Fetch Details ?
              </Text>
              <Pressable
                className='bg-red-400 mr-2 p-4 rounded-full'
                onPress={() => {
                  setImage(null)
                }}
              >
                <Text className='text-black font-bold'>cancel</Text>
              </Pressable>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className='px-5 mr-2 py-2.5 items-center justify-between flex-row flex-1 border-palelime border-2 rounded-full'
            >
              <TextInput
                className=' flex-initial mr-3 '
                ref={textInputRef}
                value={text}
                onChangeText={setText}
                placeholder='Chat with Your Virtual Fitness Coach!'
                placeholderTextColor={'#CBD5E0'}
                style={{ color: 'white' }}
                onFocus={() => {
                  setKbFocused(true)
                }}
              />
              <Pressable
                onPress={() => {
                  loadImage()
                }}
              >
                <Image
                  tintColor={'#D5FF5F'}
                  className='w-[25] h-[25]'
                  source={require('../../assets/icons/cameraicon.png')}
                />
              </Pressable>
            </Animated.View>
          )}

          <Pressable
            onPress={() => {
              if (!geminiLoading) {
                if (!image) {
                  useStore.setState({ messages: [...messages, { message: text, ai: false, time: new Date().toLocaleTimeString().slice(0, -3) }] })
                }
                getGeminiResponse(text, image)
                setText("")
                setImage(null)
                handleUnfocus()
              }
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
      </View>
    </SafeAreaView>
  )
})

export default chat