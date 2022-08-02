import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const DirectMessagesHeader = () => {
  return (
    <View className='py-4 pt-0 bg-discord-gray-2  '>
      <View className='flex-row justify-between mb-2'>
        <Text
          className='text-white mb-2'
          style={{ fontFamily: 'Rubik_700Bold', fontSize: 15 }}
        >
          Direct Messages
        </Text>
        <MaterialCommunityIcons
          name='message-badge'
          size={20}
          color='#b0b2b4'
        />
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5}>
          <View className='rounded bg-discord-gray-3 flex-row justify-between py-2 px-2'>
            <Text className='text-gray-400 text-xs'>
              Find or start a conversation
            </Text>
            <MaterialIcons name='search' size={16} color='#b0b2b4' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DirectMessagesHeader
