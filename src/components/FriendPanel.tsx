import React, { memo, useState } from 'react'
import {
    ImageBackground,
    TouchableHighlight,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import StatusIndicator from './StatusIndicator'

const FriendPanel = (props) => {
    const [isPressed, setIsPressed] = useState(false)
    return (
        <TouchableHighlight
            activeOpacity={1}
            underlayColor='rgba(79, 84, 92, 0.6)'
            onPress={() => {
                props.setSelectedFriend({
                    username: props.username,
                    status: props.status,
                    avatar: props.avatar,
                })
            }}
            onShowUnderlay={() => setIsPressed(true)}
            onHideUnderlay={() => setIsPressed(false)}
            className='rounded'
        >
            <View className='flex flex-row justify-start py-2 items-center'>
                <View>
                    <ImageBackground
                        source={{ uri: props.avatar }}
                        className='h-[30px] w-[30px] rounded-full overflow-hidden bg-white'
                        resizeMode='cover'
                    />
                    <StatusIndicator status={props.status} />
                </View>
                <Text
                    className={
                        (isPressed ? 'text-white' : 'text-gray-400') +
                        ' ml-3 font-medium'
                    }
                >
                    {props.username}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default memo(FriendPanel)
