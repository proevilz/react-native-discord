import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { statusIdToString } from '../../utils'
import StatusIndicator from '../StatusIndicator'

const FriendsPanel = ({ username, avatar, status }) => {
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity>
          <View className="flex-row">
            <View>
              <ImageBackground
                source={{ uri: avatar }}
                className="h-[35px] w-[35px] rounded-full overflow-hidden bg-white"
                resizeMode="cover"
              ></ImageBackground>
              <StatusIndicator status={status} />
            </View>
            <View className="ml-2">
              <Text className="text-white font-bold">{username}</Text>
              <Text className="text-xs font-semibold text-gray-500">
                {statusIdToString(status)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity className="rounded-full bg-discord-gray-5 p-2">
            <MaterialIcons name="phone-in-talk" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full bg-discord-gray-5 p-2 ml-4">
            <MaterialCommunityIcons
              name="message-badge"
              size={20}
              color="#b0b2b4"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="ml-auto mt-4 h-[0.5px] w-[90%] bg-gray-500/20" />
    </View>
  )
}

export default FriendsPanel
