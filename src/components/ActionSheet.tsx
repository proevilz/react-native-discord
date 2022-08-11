import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import React, { useCallback, useEffect } from 'react'
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { closeActionSheet } from '../slices/uiSlice'
import { RootState } from '../store'
import PhonePlus from './icons/PhonePlus'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 110

const ActionSheet = () => {
  const dispatch = useDispatch()
  const actionSheetOpen = useSelector(
    (state: RootState) => state.ui.actionSheetOpen
  )
  const actionSheetUser = useSelector(
    (state: RootState) => state.ui.selectedUser
  )
  const handleCloseActionSheet = () => {
    dispatch(closeActionSheet())
  }
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const scrollTo = useCallback((destination: number) => {
    'worklet'
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])
  const gesture = Gesture.Pan()
    .onBegin((event) => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        event.translationY + context.value.y,
        MAX_TRANSLATE_Y
      )
    })
    .onEnd((event) => {
      if (translateY.value < -SCREEN_HEIGHT / 1.8) {
        return scrollTo(MAX_TRANSLATE_Y)
      } else if (
        translateY.value > -SCREEN_HEIGHT / 2 &&
        translateY.value < -SCREEN_HEIGHT / 3
      ) {
        return scrollTo(-SCREEN_HEIGHT / 1.8)
      } else {
        runOnJS(handleCloseActionSheet)()
      }
    })
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })
  useEffect(() => {
    if (actionSheetOpen === true) {
      scrollTo(-SCREEN_HEIGHT / 1.8)
    } else {
      scrollTo(0)
    }
  }, [actionSheetOpen])

  return (
    <>
      {actionSheetOpen && (
        <View className="absolute w-full h-full z-0 bg-black/50 top-0"></View>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View
          className="w-full bg-discord-gray-5 absolute z-100 rounded-t-xl z-100"
          style={[
            {
              height: SCREEN_HEIGHT,
              top: SCREEN_HEIGHT,
            },
            animatedStyles,
          ]}
        >
          <View className="w-[55px] h-[4] bg-gray-300 self-center -mt-4 rounded relative -top-[10px]" />

          <View className="overflow-hidden rounded-t-xl">
            <ImageBackground
              source={require('../../assets/images/actionsheetheader.jpg')}
              resizeMode="cover"
              className="h-[150px] rounded-t-xl"
            >
              <TouchableOpacity className="self-end mr-5 rounded-full bg-black/50 mt-5">
                <Entypo name="dots-three-horizontal" size={24} color="grey" />
              </TouchableOpacity>
            </ImageBackground>
            <View className="flex-row bg-discord-gray-1 items-center px-2 py-5">
              <Text className="text-white font-bold text-xl">
                {actionSheetUser.username}
              </Text>
              <Text className="ml-2 text-gray-400 font-bold text-2xl">
                #0001
              </Text>
            </View>
            <View className="h-[0.5px] w-full bg-gray-500/15" />
            <View className="flex-row items-center justify-between px-6 bg-discord-gray-1 py-5">
              <TouchableOpacity>
                <View className="justify-center items-center">
                  <MaterialCommunityIcons
                    name="message-badge"
                    size={25}
                    color="#b0b2b4"
                  />
                  <Text className="text-gray-500 mt-1">Message</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="justify-center items-center">
                  <MaterialIcons
                    name="phone-in-talk"
                    size={25}
                    color="#b0b2b4"
                  />
                  <Text className="text-gray-500 mt-1">Call</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="justify-center items-center">
                  <Ionicons name="md-videocam" size={25} color="#b0b2b4" />
                  <Text className="text-gray-500 mt-1">Video</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="p-4">
              <Text className="uppercase font-extrabold text-gray-300">
                About me
              </Text>
              <View className="border border-discord-gray-1 mt-2 p-3 bg-[#292b2f] rounded">
                <Text className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et,
                  vero architecto nam nihil dolores voluptates magnam eligendi
                  quia animi distinctio quam ipsum, cum ad, illo obcaecati? Illo
                  molestias quos tempora.
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  )
}

export default ActionSheet
