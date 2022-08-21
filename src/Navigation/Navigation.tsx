import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Profile from '../Screens/Profile'
import TabBarIcon from '../components/TabBarIcon'
import AuthStack from './AuthStack'
import DirectMessages from '../Screens/DirectMessages'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '@aws-amplify/auth'
import type { RootState } from '../store'
import Friends from '../Screens/Friends'
import Splash from '../components/SplashScreen'
import { navigationRef } from './RootNavigation'
import { updateUser } from '../slices/authSlice'
import * as SplashScreen from 'expo-splash-screen'

const Tab = createBottomTabNavigator()
const Navigation = ({ appIsReady }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const [currentUserDetermined, setCurrentUserDetermined] = useState(false)
  const dispatch = useDispatch()

  // console.log({ loading })
  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
  }
  useEffect(() => {
    if (appIsReady && currentUserDetermined) {
      hideSplashScreen()
    }
  }, [currentUserDetermined])
  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentUserInfo()
      if (currentUser.username) {
        dispatch(
          updateUser({
            loggedIn: true,
            user: {
              id: currentUser.id,
              avatar:
                'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
              username: currentUser.nickname,
              status: 4,
            },
          })
        )
      }
      setCurrentUserDetermined(true)
    } catch (error) {
      setCurrentUserDetermined(true)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  const bottomTabVisible = useSelector(
    (state: RootState) => state.bottomTabs.visible
  )

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(bottomTabVisible ? 0 : 80, {
          duration: 200,
        }),
      },
    ],
  }))
  return (
    <Splash currentUserDetermined={currentUserDetermined}>
      <NavigationContainer ref={navigationRef}>
        {appIsReady && currentUserDetermined ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={route.name} color={color} focused={focused} />
              ),
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: '#18191c',
                borderTopColor: '#18191c',
                position: 'absolute',
              },

              headerShown: false,
            })}
            tabBar={(props) => (
              <Animated.View style={animatedStyles}>
                <BottomTabBar {...props} />
              </Animated.View>
            )}
          >
            <Tab.Screen name="DirectMessages" component={DirectMessages} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Search" component={Profile} />
            <Tab.Screen name="Mentions" component={Profile} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </Splash>
  )
}

export default Navigation
