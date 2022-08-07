import React, { useContext } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import StatusIndicator from '../components/StatusIndicator'
import Animated, {
    useAnimatedStyle,
    cancelAnimation,
    Easing,
    withTiming,
    interpolate,
    useSharedValue,
    Extrapolate,
    runOnJS,
} from 'react-native-reanimated'
import {
    FlatList,
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler'
import { UiContext } from '../context/UiContext'

import { AuthContext } from '../context/AuthContext'
import { mockFriends, conversations, mockChat } from '../../mockdata'
import ChatMessage from '../components/ChatMessage'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Chat = ({ selectedConversation, offset, start }) => {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const { authedUser } = useContext(AuthContext)
    const conversation = conversations.find(
        (conversation) => conversation.id === selectedConversation
    )
    const otherUser = conversation.users.find(
        (userId) => userId !== authedUser.id
    )
    const user = mockFriends.find((friend) => friend.id == otherUser)
    const { username, status } = user
    const { bottomTabVisible } = useContext(UiContext)
    const isPressed = useSharedValue(false)
    const updatePressed = (value) => (isPressed.value = value)

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            start.value = offset.value
            isPressed.value = true
            cancelAnimation(bottomTabVisible)
            cancelAnimation(offset)
        })
        .onUpdate((e) => {
            offset.value = start.value + e.translationX
        })
        .onEnd((event) => {
            if (offset.value > screenWidth / 2) {
                offset.value = withTiming(screenWidth - 50, {
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            } else if (offset.value < -screenWidth / 2) {
                offset.value = withTiming(-screenWidth + 50, {
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            } else {
                offset.value = withTiming(0, {
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            }
            start.value = offset.value
            // isPressed.value = false
        })
        .onFinalize(() => {
            runOnJS(updatePressed)(false)
        })
        .activeOffsetX([-5, 5])
        .failOffsetY([-5, 5])

    const animatedStyles = useAnimatedStyle(() => {
        if (offset.value == 340) {
            bottomTabVisible.value = true
        } else {
            bottomTabVisible.value = false
        }
        return {
            transform: [
                {
                    translateX: offset.value,
                },
            ],
        }
    })
    const hAnimatedStyles = useAnimatedStyle(() => {
        const opacity = () => {
            if (
                offset.value === 0 ||
                (offset.value < 339 && offset.value > 0) ||
                (offset.value > -339 && offset.value < 0)
            ) {
                return 1
            } else if (offset.value === -340 || offset.value === 340) {
                return 0
            }
        }
        return {
            height: screenHeight + 47,
            position: 'absolute',
            width: '100%',
            top: -47,
            opacity: withTiming(opacity()),
            shadowOpacity: isPressed.value ? 0.25 : 0,
            shadowOffset: {
                width: -2,
                height: -2,
            },
        }
    })
    const mAnimatedStyles = useAnimatedStyle(() => {
        const radius = interpolate(
            offset.value,
            [-340, 0, 340],
            [12, 0, 12],
            Extrapolate.CLAMP
        )
        return {
            borderTopLeftRadius: Math.floor(radius),
            borderTopRightRadius: Math.floor(radius),
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    animatedStyles,
                    mAnimatedStyles,
                    {
                        height: screenHeight - 24,
                    },
                ]}
                className='bg-discord-gray-2  w-full pb-12 z-10 absolute '
            >
                <Animated.View
                    className='bg-discord-gray-5'
                    style={hAnimatedStyles}
                ></Animated.View>
                <Animated.View
                    style={[mAnimatedStyles]}
                    className={
                        'p-4 bg-discord-gray-5 border-solid border-gray-900 border-b  flex flex-row items-center justify-between'
                    }
                >
                    <View className={'items-center flex flex-row'}>
                        <TouchableOpacity
                            onPress={() => {
                                // setFocused((prev) => !prev)
                            }}
                        >
                            <Ionicons
                                name='ios-menu-sharp'
                                size={24}
                                color='gray'
                            />
                        </TouchableOpacity>
                        <Text className='text-white mb-1 ml-3 mr-5 font-bold'>
                            <Text className='text-discord-gray-4 font-bold'>
                                @{'  '}
                            </Text>
                            {username}
                        </Text>
                        <View className='flex items-center pt-2'>
                            <StatusIndicator bgVariant='3' status={status} />
                        </View>
                    </View>
                    <View className='items-center flex flex-row'>
                        <MaterialIcons
                            name='phone-in-talk'
                            size={20}
                            color='gray'
                        />
                        <View className='mx-1' />
                        <Ionicons name='md-videocam' size={20} color='gray' />
                    </View>
                </Animated.View>
                <KeyboardAvoidingView
                    className='w-full   flex-1'
                    keyboardVerticalOffset={57}
                    behavior='padding'
                >
                    <View className='justify-between bg-discord-gray-2 w-full h-full '>
                        <FlatList
                            inverted={true}
                            data={mockChat}
                            className='h-[50px]'
                            renderItem={({ item }) => (
                                <ChatMessage message={item} key={item.id} />
                            )}
                        />
                        <Animated.View className='flex justify-between pt-3 w-full flex-row px-3 border-t border-gray-900 bg-discord-gray-5'>
                            <TouchableOpacity>
                                <View className='rounded-full bg-discord-gray-3 w-[40px] h-[40px] mr-2 flex items-center justify-center'>
                                    <Text className='text-gray-500 mb-1 text-2xl font-light'>
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View className='rounded-full bg-discord-gray-3 w-[40px] h-[40px] mr-2 flex items-center justify-center'>
                                    <MaterialCommunityIcons
                                        name='gift'
                                        size={20}
                                        color='gray'
                                    />
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                keyboardAppearance='dark'
                                className='bg-discord-gray-3 p-2 py-3 rounded-full flex-1 px-4 text-white'
                                placeholder={`Message @${username}`}
                                placeholderTextColor='gray'
                            />
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
        </GestureDetector>
    )
}

export default Chat
