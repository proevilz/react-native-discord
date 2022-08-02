import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../Screens/Profile'
import TabBarIcon from '../components/TabBarIcon'
import ChatStack from './ChatStack'
import Friends from '../Screens/Friends'

const Tab = createBottomTabNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={route.name} color={color} focused={focused} />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#17191c',
            borderTopColor: '#17191c',
          },

          headerShown: false,
        })}
      >
        <Tab.Screen name='Home' component={Friends} />
        <Tab.Screen name='friends' component={ChatStack} />
        <Tab.Screen name='search' component={ChatStack} />
        <Tab.Screen name='mentions' component={ChatStack} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
