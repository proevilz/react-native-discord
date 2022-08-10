import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, TextInput, Text } from 'react-native'

import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import SendMessage from './icons/SendMessage'
import { AntDesign } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../slices/chatSlice'
import { RootState } from '../store'

const ChatInput = ({ user, conversationId }) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const authedUser = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(
      addMessage({
        message: inputValue,
        authorId: authedUser.id,
        conversationId,
      })
    )
    setInputValue('')
  }
  useEffect(() => {
    if (!inputValue.length) {
      setOpen(false)
    }
  }, [inputValue])
  const leftAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            (() => {
              if (inputValue.length > 0 && open) {
                return 0
              }
              if (inputValue.length > 0 && !open) {
                return -200
              }
              return 0
            })()
          ),
        },
      ],
      width: withTiming(
        (() => {
          if (inputValue.length > 0 && open) {
            return 100
          }
          if (inputValue.length > 0 && !open) {
            return 0
          }
          return 100
        })()
      ),
    }
  })
  const rightAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(inputValue.length == 0 ? 50 : 0),
        },
      ],
      width: withTiming(inputValue.length == 0 ? 0 : 50),
    }
  })
  const caretAnimatedStyles = useAnimatedStyle(() => {
    const handleCaret = () => ({
      translate: () => {
        if (inputValue.length > 0 && open) {
          return -100
        }
        if (inputValue.length > 0 && !open) {
          return -5
        }
        return -100
      },
      width: () => {
        if (inputValue.length > 0 && open) {
          return 0
        }
        if (inputValue.length > 0 && !open) {
          return 20
        }
        return 0
      },
    })
    return {
      position: 'relative',
      transform: [
        {
          translateX: withTiming(handleCaret().translate()),
        },
      ],
      width: withTiming(handleCaret().width()),
    }
  })

  return (
    <Animated.View className="flex justify-between pt-3 w-full flex-row px-3 border-t border-gray-900 bg-discord-gray-5 max-h-[50px]">
      <Animated.View
        style={caretAnimatedStyles}
        className="flex items-center justify-center"
      >
        <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
          <AntDesign name="right" size={20} color="gray" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[leftAnimatedStyles]} className="flex flex-row">
        <TouchableOpacity>
          <View className="rounded-full bg-discord-gray-3 w-[40px] h-[40px] mr-2 flex items-center justify-center">
            <Text className="text-gray-500 mb-1 text-2xl font-light">+</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="rounded-full bg-discord-gray-3 w-[40px] h-[40px] mr-2 flex items-center justify-center">
            <MaterialCommunityIcons name="gift" size={20} color="gray" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <TextInput
        onChange={({ nativeEvent }) => setInputValue(nativeEvent.text)}
        keyboardType="twitter"
        defaultValue={inputValue}
        keyboardAppearance="dark"
        className="bg-discord-gray-3 p-2 py-3 rounded-full  flex-1 px-4 text-white"
        placeholder={`Message @${user.username}`}
        placeholderTextColor="gray"
      />
      <Animated.View style={rightAnimatedStyles}>
        <TouchableOpacity onPress={handleSubmit}>
          <View className="rounded-full bg-[#5865f2] w-[40px] h-[40px] ml-2 flex items-center justify-center pl-1">
            <SendMessage className="border border-green-500" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default ChatInput
