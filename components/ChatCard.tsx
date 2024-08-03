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
      marginRight : (chatItem.ai) ? 20:0,
      marginLeft : (chatItem.ai) ? 0:20
    }}>
      <View
        style={{ backgroundColor: (chatItem.ai) ? '#D4DD5F' : '#2D2D36' }}
        className=' px-3 items-center justify-center my-1 py-2 rounded-2xl bg-darkgray'
      >
        <Markdown
          style={{
            body: {
              color: (chatItem.ai) ? '#000' : '#fff',
              fontSize: 15,
            },
          }}
        >
          {chatItem.message}
        </Markdown>
      </View>
    </View>
  )
}

export default ChatCard