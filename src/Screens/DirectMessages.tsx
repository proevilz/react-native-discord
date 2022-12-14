import React from 'react'
import { View, FlatList, Dimensions } from 'react-native'

import ConversationPanel from '../components/ConversationPanel'
import Layout from '../components/Layout'

import ServerSideBar from '../components/ServerSideBar'

import DirectMessagesHeader from '../components/DirectMessagesHeader'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Chat from './Chat'
import RightSideBar from '../components/RightSideBar'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import type { RootTabScreenProps } from '../navigation/types'

const screenWidth = Dimensions.get('window').width
const DirectMessages = ({
  navigation,
}: RootTabScreenProps<'DirectMessages'>) => {
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  )
  const offset = useSharedValue(0)
  const start = useSharedValue(0)

  const lAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: offset.value >= 0 ? 1 : 0,
    }
  })
  const rAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: offset.value <= 0 ? 1 : 0,
      transform: [
        {
          translateX: offset.value <= 0 ? 0 : screenWidth,
        },
      ],
    }
  })
  const tabBarHeight = useBottomTabBarHeight()
  return (
    <Layout>
      <View className="flex flex-row flex-1">
        <Animated.View className="flex flex-row flex-1" style={lAnimatedStyles}>
          <ServerSideBar tabBarHeight={tabBarHeight} />
          <View className="flex-1 bg-discord-gray-2  rounded-t-xl p-4  pb-0 max-w-[65%] ">
            <DirectMessagesHeader />
            <FlatList
              data={conversations}
              style={{ marginBottom: tabBarHeight }}
              renderItem={({ item }) => (
                <ConversationPanel
                  offset={offset}
                  navigation={navigation}
                  {...item}
                />
              )}
            />
          </View>
        </Animated.View>

        <Chat offset={offset} start={start} />
        <Animated.View
          className="w-[80%] rounded-t-xl bg-discord-gray-2 h-full absolute right-[10px]"
          style={rAnimatedStyles}
        >
          <RightSideBar />
        </Animated.View>
      </View>
    </Layout>
  )
}

export default DirectMessages
