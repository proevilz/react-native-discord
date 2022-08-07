import React, { useContext } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { mockFriends } from '../../mockdata'
import { AuthContext } from '../context/AuthContext'
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ChatMessage = ({ message }) => {
    const { authedUser } = useContext(AuthContext)
    const findUser = () => {
        if (message.authorId === authedUser.id) {
            return authedUser
        }
        return mockFriends.find((friend) => friend.id == message.authorId)
    }
    const user = findUser()

    const formatTimestamp = (timestamp) => {
        if (dayjs(timestamp).isBefore(dayjs().subtract(2, 'days'))) {
            return dayjs(timestamp).format('DD/MM/YYYY')
        }
        if (dayjs(timestamp).isBefore(dayjs().subtract(1, 'days'))) {
            return 'Yesterday at ' + dayjs(timestamp).format('HH:mm')
        }
        return 'Today at ' + dayjs(timestamp).format('HH:mm')
    }

    return (
        <View className='flex flex-row items-center my-3'>
            <ImageBackground
                source={{ uri: user.avatar }}
                className='h-[40px] w-[40px] rounded-full overflow-hidden mr-2 mb-1'
                resizeMode='cover'
            ></ImageBackground>
            <View className='flex flex-column'>
                <View className='flex flex-row'>
                    <TouchableOpacity>
                        <Text className='text-white font-extrabold  mr-3'>
                            {user.username}
                        </Text>
                    </TouchableOpacity>
                    <Text className='text-gray-500 text-xs'>
                        {formatTimestamp(message.createdAt)}
                    </Text>
                </View>
                <Text className='text-gray-100'>{message.text}</Text>
            </View>
        </View>
    )
}

export default ChatMessage
