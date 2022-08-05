import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native'
import { mockFriends } from '../../mockdata'
import FriendPanel from '../components/FriendPanel'
import Layout from '../components/Layout'

import ServerSideBar from '../components/ServerSideBar'

import DirectMessagesHeader from '../components/DirectMessagesHeader'

import Chat from './Chat'
import RightSideBar from '../components/RightSideBar'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated'
const screenWidth = Dimensions.get('window').width
const Friends = ({ route, navigation }) => {
    const [selectedFriend, setSelectedFriend] = useState(mockFriends[0])
    const [rightSideBarVisible, setRightSideBarVisible] = useState(true)

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

    return (
        <Layout>
            <View className='flex flex-row flex-1'>
                <Animated.View
                    className='flex flex-row flex-1'
                    style={lAnimatedStyles}
                >
                    <ServerSideBar rightSideBarVisible={rightSideBarVisible} />
                    <View className='flex-1 bg-discord-gray-2  rounded-t-xl p-4  pb-0 max-w-[65%] '>
                        <DirectMessagesHeader />
                        <FlatList
                            data={mockFriends}
                            style={{}}
                            renderItem={({ item }) => (
                                <FriendPanel
                                    navigation={navigation}
                                    setSelectedFriend={setSelectedFriend}
                                    {...item}
                                />
                            )}
                        />
                    </View>
                </Animated.View>

                <Chat
                    offset={offset}
                    start={start}
                    selectedFriend={selectedFriend}
                    setRightSideBarVisible={setRightSideBarVisible}
                />
                <Animated.View
                    className='w-[80%] rounded-t-xl bg-discord-gray-2 h-full absolute right-[10px]'
                    style={rAnimatedStyles}
                >
                    <RightSideBar selectedFriend={selectedFriend} />
                </Animated.View>
            </View>
        </Layout>
    )
}

export default Friends
