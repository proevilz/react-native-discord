import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import StatusIndicator from '../components/StatusIndicator'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

const Chat = ({ selectedFriend }) => {
  const screenWidth = Dimensions.get('window').width

  const { username, status } = selectedFriend
  const [focused, setFocused] = useState(true)
  const animatedStyles = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [{ translateX: 1 * 255 }],
    }
  })
  return (
    <View
      className={
        'bg-discord-gray-2 h-full  pb-3 z-10 absolute z-100' +
        'w=[' +
        screenWidth +
        'px] ' +
        (focused ? ' right-0' : ' right-[-350px]  rounded-t-xl')
      }
    >
      <View
        className={
          'p-4 bg-discord-gray-1 border-solid border-gray-900 border-b flex flex-row items-center justify-between' +
          (focused ? '' : ' rounded-t-xl')
        }
      >
        <View
          className={
            'items-center flex flex-row' + (focused ? '' : ' rounded-t-xl')
          }
        >
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='ios-menu-sharp' size={24} color='gray' />
          </TouchableOpacity>
          <Text className='text-white mb-1 ml-3 mr-5 font-bold'>
            <Text className='text-discord-gray-4 font-bold'>@{'  '}</Text>
            {username}
          </Text>
          <View className='flex items-center pt-2'>
            <StatusIndicator bgVariant={'1'} status={status} />
          </View>
        </View>
        <View className='items-center flex flex-row'>
          <MaterialIcons name='phone-in-talk' size={20} color='gray' />
          <View className='mx-1' />
          <Ionicons name='md-videocam' size={20} color='gray' />
        </View>
      </View>
      <View className='px-4 mt-1'></View>
    </View>
  )
}

export default Chat
