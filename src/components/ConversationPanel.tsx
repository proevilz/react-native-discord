import React, { memo, useContext, useEffect, useState } from 'react'
import { ImageBackground, TouchableHighlight, View, Text } from 'react-native'
import { mockFriends } from '../../mockdata'
import { AuthContext } from '../context/AuthContext'
import { UiContext } from '../context/UiContext'
import StatusIndicator from './StatusIndicator'

const ConversationPanel = (props) => {
    const { setVisible } = useContext(UiContext)
    const [isPressed, setIsPressed] = useState(false)
    const { authedUser } = useContext(AuthContext)
    const otherUser = props.users.find((userId) => userId !== authedUser.id)
    const user = mockFriends.find((friend) => friend.id == otherUser)

    return (
        <TouchableHighlight
            activeOpacity={1}
            underlayColor='rgba(79, 84, 92, 0.6)'
            onPress={() => {
                props.setSelectedConverstaion(props.id)
                props.offset.value = 0
                setVisible((prev) => !prev)
            }}
            onShowUnderlay={() => setIsPressed(true)}
            onHideUnderlay={() => setIsPressed(false)}
            className='rounded'
        >
            <View className='flex flex-row justify-start py-2 items-center'>
                <View>
                    <ImageBackground
                        source={{ uri: user.avatar }}
                        className='h-[30px] w-[30px] rounded-full overflow-hidden bg-white'
                        resizeMode='cover'
                    />
                    <StatusIndicator status={user.status} />
                </View>
                <Text
                    className={
                        (isPressed ? 'text-white' : 'text-gray-400') +
                        ' ml-3 font-medium'
                    }
                >
                    {user.username}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default memo(ConversationPanel)
