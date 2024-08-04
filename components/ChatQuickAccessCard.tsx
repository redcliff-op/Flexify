import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useStore } from '@/src/store/store'

interface ChatQuickAccessCardProps {
  heading: string,
  desc: string,
  index: number
}

const ChatQuickAccessCard = ({ heading, desc, index }: ChatQuickAccessCardProps) => {

  const { activity, activityList } = useStore((state) => ({
    activity: state.activity,
    activityList: state.activityList,
  }));

  const pastRecord = JSON.stringify(activityList.slice(-10));
  const todaysActivity = JSON.stringify(activity)

  const GeminiPromots: string[] = [
    "Kindly give me a 7 day workout plan explaining each day's plan",
    `Kindly tell me what should I eat after today's workout, workout consisted of normal exercises like sprints etc, my workout stats for today are ${todaysActivity}`,
    `Kindly Review my last 10 days of workout progress, my record is ${pastRecord} for past 10 days`,
    "Kindly give me some exercise tips for basic exercises like running, pushups, pullups and some more that you can find",
  ];

  const {getGeminiResponse} = useStore((state)=>({
    getGeminiResponse: state.getGeminiResponse
  }))

  return (
    <Pressable
      onPress={()=>{
        getGeminiResponse(GeminiPromots[index])
      }}
      className='flex-1 p-5 bg-darkgray m-1 rounded-2xl'
    >
      <Text className='text-2xl mb-2 text-palelime font-semibold'>{heading}</Text>
      <Text className='text-base text-white '>{desc}</Text>
    </Pressable>
  )
}

export default ChatQuickAccessCard