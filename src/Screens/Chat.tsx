import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import StatusIndicator from '../components/StatusIndicator'
import Animated, {
    useAnimatedStyle,
    cancelAnimation,
    Easing,
    withTiming,
    getRelativeCoords,
    useAnimatedRef,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const Chat = ({ selectedFriend, offset, start, setRightSideBarVisible }) => {
    const screenWidth = Dimensions.get('window').width
    const { username, status } = selectedFriend
    const [localX, setLocalX] = useState(0)

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            start.value = offset.value
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
        })

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: screenWidth,
            transform: [
                {
                    translateX: offset.value,
                },
            ],
        }
    })
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[animatedStyles]}
                className={
                    'bg-discord-gray-2 h-full  pb-3 z-10 absolute z-100 ' +
                    (localX === 0 ? 'w-full' : 'rounded-t-xl')
                }
            >
                <View
                    className={
                        'p-4 bg-discord-gray-3 border-solid border-gray-900 border-b  flex flex-row items-center justify-between' +
                        (localX === 0 ? '' : ' rounded-t-xl')
                    }
                >
                    <View
                        className={
                            'items-center flex flex-row' +
                            (localX === 0 ? '' : ' rounded-t-xl')
                        }
                    >
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
                </View>
                <View className='px-4 mt-1'></View>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    view: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
export default Chat
