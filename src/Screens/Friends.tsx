import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../slices/bottomTabsSlice'
import { RootState, selectors } from '../store'
import PhonePlus from '../components/icons/PhonePlus'
import Layout from '../components/Layout'
import FriendsPanel from '../components/Friends/FriendsPanel'

const Friends = ({}) => {
  const friendsList = useSelector((state: RootState) => state.auth.friends)
  return (
    <Layout>
      <View className="bg-discord-gray-3 h-10 px-4 flex-row items-center w-full ">
        <View className="flex-1 w-full" />
        <View className="flex-1  w-full">
          <Text className="text-white font-bold text-lg text-center">
            Friends
          </Text>
        </View>
        <View className="flex-1 flex-row w-full items-center justify-between px-2">
          <TouchableOpacity className="-mb-1">
            <MaterialCommunityIcons
              name="message-badge"
              size={20}
              color="#b0b2b4"
            />
          </TouchableOpacity>
          <TouchableOpacity className="">
            <MaterialCommunityIcons
              name="account-plus"
              size={24}
              color="#b0b2b4"
            />
          </TouchableOpacity>
          <TouchableOpacity className="">
            <PhonePlus width={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-discord-gray-5 flex-1">
        <FlatList
          data={friendsList}
          className="h-[50px] px-2"
          renderItem={({ item }) => <FriendsPanel {...item} />}
        />
      </View>
    </Layout>
  )
}

export default Friends
