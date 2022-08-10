import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { statusIdToString } from '../../utils'
import AvatarIcon from '../AvatarIcon'

const FriendsPanel = ({ username, avatar, status }) => {
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity>
        <View className="flex-row">
          <AvatarIcon />
          <View>
            <Text>{username}</Text>
            <Text>{statusIdToString(status)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row">
        <TouchableOpacity className="-mb-1">
          <MaterialIcons name="phone-in-talk" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="-mb-1">
          <MaterialCommunityIcons
            name="message-badge"
            size={20}
            color="#b0b2b4"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FriendsPanel
