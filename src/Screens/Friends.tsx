import React, { useState } from 'react'
import {
    View,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { mockFriends } from '../../mockdata'
import FriendPanel from '../components/FriendPanel'

const Friends = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View className='bg-discord-gray-2 h-full pb-3'>
                <View className='p-4 bg-discord-gray-2  border-solid border-gray-500 border-b'>
                    <Text className='text-white text-3xl mb-2'>Friends</Text>
                    <View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <View className='rounded bg-discord-gray-3 h-[28px] px-2'>
                                <Text className='leading-[27px] text-gray-400'>
                                    Find or start a conversation
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='px-4 mt-1'>
                    <FlatList
                        data={mockFriends}
                        renderItem={({ item }) => (
                            <FriendPanel navigation={navigation} {...item} />
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Friends
