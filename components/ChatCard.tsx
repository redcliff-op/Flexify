import { View, Text } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display';

interface ChatCardProps {
  chatItem: ChatMessage
}

const ChatCard = ({ chatItem }: ChatCardProps) => {
  return (
    <View style={{
      alignItems: (chatItem.ai) ? 'flex-start' : 'flex-end',
      marginRight: (chatItem.ai) ? 20 : 0,
      marginLeft: (chatItem.ai) ? 0 : 20
    }}>
      <View
        style={{ backgroundColor: (chatItem.ai) ? '#D4DD5F' : '#2D2D36' }}
        className=' flex-wrap px-3 items-end flex-row justify-center my-1 py-2 rounded-2xl bg-darkgray'
      >
        <Markdown
          style={{
            body: {
              color: (chatItem.ai) ? '#000' : '#fff',
              fontSize: 17,
            },
          }}
        >
          {chatItem.message}
        </Markdown>
        <Text
          style={{color:(chatItem.ai)?'black':'#E2E8F0'}}
          className=' ml-2 text-xs text-end'
        >
          {chatItem.time}
        </Text>
      </View>
    </View>
  )
}

export default ChatCard