import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { mockFriends } from '../../mockdata'
import FriendPanel from '../components/FriendPanel'
import Layout from '../components/Layout'

import ServerSideBar from '../components/ServerSideBar'

import DirectMessagesHeader from '../components/DirectMessagesHeader'

import Chat from './Chat'
import RightSideBar from '../components/RightSideBar'
const Friends = ({ route, navigation }) => {
    const [selectedFriend, setSelectedFriend] = useState(mockFriends[0])
    const [rightSideBarVisible, setRightSideBarVisible] = useState(true)
    return (
        <Layout>
            <View className='flex flex-row flex-1 '>
                {rightSideBarVisible && <ServerSideBar />}

                {rightSideBarVisible && (
                    <View className='flex-1 bg-discord-gray-2 pb-3 rounded-t-xl p-4 max-w-[65%]'>
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
                )}

                <Chat
                    selectedFriend={selectedFriend}
                    setRightSideBarVisible={setRightSideBarVisible}
                />
                {!rightSideBarVisible && (
                    <RightSideBar selectedFriend={selectedFriend} />
                )}
            </View>
        </Layout>
    )
}

export default Friends
