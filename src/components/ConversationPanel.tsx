import React, { memo, useContext, useEffect, useState } from 'react'
import { ImageBackground, TouchableHighlight, View, Text } from 'react-native'
import { withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { mockFriends } from '../../mockdata'
import { selectors } from '../store'
import { selectConversation } from '../slices/chatSlice'
import { RootState } from '../store'
import StatusIndicator from './StatusIndicator'

const ConversationPanel = (props) => {
    const [isPressed, setIsPressed] = useState(false)
    const { findConversationUser } = selectors
    const user = useSelector((state) => findConversationUser(state, props.id))
    const dispatch = useDispatch()
    return (
        <TouchableHighlight
            activeOpacity={1}
            underlayColor='rgba(79, 84, 92, 0.6)'
            onPress={() => {
                dispatch(selectConversation({ conversationId: props.id }))
                props.offset.value = withTiming(0)
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
export default ConversationPanel
// export default memo(ConversationPanel)
