import React, { useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const ActionSheet = () => {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
    .onBegin((event) => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + 110)
    })
    .onEnd((event) => {})
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
    translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 })
  }, [])
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className="w-full bg-white absolute z-100 rounded-t-xl"
        style={[
          {
            height: SCREEN_HEIGHT,
            top: SCREEN_HEIGHT,
          },
          animatedStyles,
        ]}
      >
        <View className="w-[75px] h-[4] bg-gray-500 self-center -mt-2 rounded" />
      </Animated.View>
    </GestureDetector>
  )
}

export default ActionSheet
