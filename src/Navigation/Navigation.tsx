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
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '@aws-amplify/auth'
import type { RootState } from '../store'
import Friends from '../Screens/Friends'
import { Hub } from '@aws-amplify/core'
import { hubListener } from '../utils'
import { navigationRef } from './RootNavigation'
import { updateUser } from '../slices/authSlice'

const Tab = createBottomTabNavigator()
const Navigation = () => {
  Hub.listen('auth', hubListener)
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const dispatch = useDispatch()
  React.useEffect(() => {
    try {
      Auth.currentUserInfo()
        .then((data) => {
          if (data.username) {
            dispatch(
              updateUser({
                loggedIn: true,
                user: {
                  id: data.id,
                  avatar:
                    'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
                  username: data.nickname,
                  status: 4,
                },
              })
            )
          }
        })
        .catch((error) => console.log('No logged in user'))
    } catch (error) {
      console.log('NLU')
    }
  }, [])
  React.useEffect(() => {
    Auth.currentUserInfo()
      .then((data) => {
        if (data.username) {
          //do something with data
        }
      })
      .catch((error) => console.log('No logged in user'))
  }, [])
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
    <NavigationContainer ref={navigationRef}>
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
  )
}

export default Navigation
