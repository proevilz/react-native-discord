import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import { View, Image, ImageBackground } from 'react-native'
import Animated, {
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface IProps {
  children?: React.ReactNode | React.ReactNode[]
  currentUserDetermined: boolean
}

const Splash = ({ children, currentUserDetermined }: IProps) => {
  const [test, setTest] = useState(true)
  useEffect(() => {
    if (currentUserDetermined) {
      setTest(false)
    }
  }, [currentUserDetermined])
  const animatedStyles = useAnimatedStyle(() => ({
    flex: 1,
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    backgroundColor: Constants.manifest?.splash?.backgroundColor,
  }))
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground)
  return (
    <View style={{ flex: 1 }}>
      {!currentUserDetermined && (
        <AnimatedImage
          source={require('../../assets/splash.png')}
          style={animatedStyles}
          resizeMode="contain"
          exiting={FadeOut}
        />
      )}
      {children}
    </View>
  )
}

export default Splash
