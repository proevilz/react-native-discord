import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native'
import StatusIndicator from './StatusIndicator'
import { Entypo } from '@expo/vector-icons'

const RightSideBar = ({ selectedFriend }) => {
  const { username, status, avatar } = selectedFriend
  const [isPressed, setIsPressed] = useState(false)
  return (
    <View className='bg-[#36393f] rounded-t-xl'>
      <View
        className='items-center justify-between rounded-t-xl flex flex-row px-4 pt-4'
        style={{
          backgroundColor: '#2f3136',
        }}
      >
        <View className='flex flex-row items-center'>
          <Text className='text-discord-gray-4 font-bold text-3xl mr-2'>@</Text>
          <Text className='text-white font-extrabold text-xl'>{username}</Text>
        </View>
        <Entypo name='dots-three-horizontal' size={24} color='grey' />
      </View>
      <View className='px-4 mt-1 flex flex-row'>
        <Text className='text-discord-gray-4 mr-2 font-extrabold text-lg'>
          AKA:
        </Text>
        <Text className='text-discord-gray-4 text-lg'>Mavelli</Text>
      </View>
      <View className='w-full bg-gray-500 opacity-50 h-[0.3px] mt-5' />
      <View className='px-4 py-4'>
        <Text className='font-extrabold uppercase text-discord-gray-4 mb-3'>
          Members - ?
        </Text>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor='rgba(79, 84, 92, 0.6)'
          onPress={() => {}}
          onShowUnderlay={() => setIsPressed(true)}
          onHideUnderlay={() => setIsPressed(false)}
          className='rounded'
        >
          <View className='flex flex-row justify-start py-2 items-center'>
            <View>
              <ImageBackground
                source={{ uri: avatar }}
                className='h-[30px] w-[30px] rounded-full overflow-hidden bg-white'
                resizeMode='cover'
              />
              <StatusIndicator status={status} />
            </View>
            <Text
              className={
                (isPressed ? 'text-white' : 'text-gray-400') +
                ' ml-3 font-medium'
              }
            >
              {username}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default RightSideBar
