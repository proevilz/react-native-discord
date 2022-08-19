import React, { memo } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { selectors } from '../store'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ChatMessage = ({ message }) => {
  console.log({ message })
  const { findMessageAuthor } = selectors
  const user = useSelector((state) =>
    findMessageAuthor(state, message.authorId)
  )

  const formatTimestamp = (timestamp) => {
    if (dayjs(timestamp).isBefore(dayjs().subtract(2, 'days'))) {
      return dayjs(timestamp).format('DD/MM/YYYY')
    }
    if (dayjs(timestamp).isBefore(dayjs().subtract(1, 'days'))) {
      return 'Yesterday at ' + dayjs(timestamp).format('HH:mm')
    }
    return 'Today at ' + dayjs(timestamp).format('HH:mm')
  }

  return (
    <View className="flex flex-row items-center my-3">
      <ImageBackground
        source={{ uri: user.avatar }}
        className="h-[40px] w-[40px] rounded-full overflow-hidden mr-2 mb-1"
        resizeMode="cover"
      ></ImageBackground>
      <View className="flex flex-column flex-1">
        <View className="flex flex-row pb-1">
          <TouchableOpacity>
            <Text className="text-white font-extrabold  mr-3">
              {user.username}
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-500 text-xs">
            {formatTimestamp(message.createdAt)}
          </Text>
        </View>
        <Text className="text-gray-300 ">{message.text}</Text>
      </View>
    </View>
  )
}

export default memo(ChatMessage)
