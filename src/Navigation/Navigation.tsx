import * as React from 'react'
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
import { useSelector } from 'react-redux'

import type { RootState } from '../store'
import Friends from '../Screens/Friends'
import { Hub } from '@aws-amplify/core'
import { hubListener } from '../utils'

const Tab = createBottomTabNavigator()
const Navigation = () => {
  Hub.listen('auth', hubListener)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const bottomTabVisible = useSelector(
    (state: RootState) => state.bottomTabs.visible
  )

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(bottomTabVisible ? 0 : 80, {
            duration: 200,
          }),
        },
      ],
    }
  })
  return (
    <NavigationContainer>
      {isLoggedIn ? (
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
          <Tab.Screen name="Home" component={DirectMessages} />
          <Tab.Screen name="friends" component={Friends} />
          <Tab.Screen name="search" component={Profile} />
          <Tab.Screen name="mentions" component={Profile} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default Navigation
