import React, { useContext, useState } from 'react'
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
  useDerivedValue,
} from 'react-native-reanimated'
import {
  FlatList,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'

import ChatMessage from '../components/ChatMessage'

import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../slices/bottomTabsSlice'
import { RootState, selectors } from '../store'
import ChatInput from '../components/ChatInput'

const Chat = ({ offset, start }) => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const { findChatParticipant, findConversation } = selectors
  const conversation = useSelector(findConversation)

  const user = useSelector(findChatParticipant)

  const dispatch = useDispatch()
  const isPressed = useSharedValue(false)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const updatePressed = (value) => (isPressed.value = value)
  const handleScroller = (val) => {
    if (val != 0) {
      setScrollEnabled(false)
    } else {
      setScrollEnabled(true)
    }
  }
  const updateBottomTabsVisibility = (value) => {
    if (value) {
      return dispatch(show())
    }
    return dispatch(hide())
  }
  const gesture = Gesture.Pan()
    .onBegin((e) => {
      start.value = offset.value
      isPressed.value = true
      // cancelAnimation(bottomTabVisible)
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
    .onFinalize(() => {
      runOnJS(updatePressed)(false)
    })
    .activeOffsetX([-5, 5])
    .failOffsetY([-5, 5])

  const animatedStyles = useAnimatedStyle(() => {
    if (offset.value == 340) {
      runOnJS(updateBottomTabsVisibility)(true)
    } else {
      runOnJS(updateBottomTabsVisibility)(false)
    }
    runOnJS(handleScroller)(offset.value)

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

  const flatList = React.useRef(null)
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          animatedStyles,
          mAnimatedStyles,
          { overflowX: 'hidden', height: screenHeight - 24 },
        ]}
        className="bg-discord-gray-2  w-full pb-12 z-10 absolute "
      >
        <Animated.View
          className="bg-discord-gray-5"
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
                offset.value = withTiming(offset.value == 0 ? 340 : 0)
              }}
            >
              <Ionicons name="ios-menu-sharp" size={24} color="gray" />
            </TouchableOpacity>
            <Text className="text-white mb-1 ml-3 mr-5 font-bold">
              <Text className="text-discord-gray-4 font-bold">@{'  '}</Text>
              {user.username}
            </Text>
            <View className="flex items-center pt-2">
              <StatusIndicator bgVariant="3" status={user.status} />
            </View>
          </View>
          <View className="items-center flex flex-row">
            <MaterialIcons name="phone-in-talk" size={20} color="gray" />
            <View className="mx-1" />
            <Ionicons name="md-videocam" size={20} color="gray" />
          </View>
        </Animated.View>
        <KeyboardAvoidingView
          className="w-full   flex-1"
          keyboardVerticalOffset={57}
          behavior="padding"
        >
          <View className="justify-between bg-discord-gray-2 w-full h-full">
            <FlatList
              scrollEnabled={scrollEnabled}
              data={conversation.messages}
              className="h-[50px] px-2"
              // inverted={true}
              renderItem={({ item }) => (
                <ChatMessage message={item} key={item.id} />
              )}
              ref={flatList}
              onContentSizeChange={() => {
                flatList.current.scrollToEnd()
              }}
              onLayout={() => {
                flatList.current.scrollToEnd()
              }}
            />
            <ChatInput conversationId={conversation.id} user={user} />
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </GestureDetector>
  )
}

export default Chat
