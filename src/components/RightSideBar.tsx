import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import StatusIndicator from './StatusIndicator'

const RightSideBar = ({ selectedFriend }) => {
    const { username, status } = selectedFriend
    return (
        <View className='w-[80%] rounded-t-xl bg-discord-gray-2 h-full absolute right-[10px]'>
            <View className={'items-center flex flex-row'}>
                <Text className='text-white mb-1 ml-3 mr-5 font-bold text-lg'>
                    <Text className='text-discord-gray-4 font-bold'>
                        @{'  '}
                    </Text>
                    {username}
                </Text>
                <View className='flex items-center pt-2'>
                    <StatusIndicator bgVariant={'1'} status={status} />
                </View>
            </View>
        </View>
    )
}

export default RightSideBar
