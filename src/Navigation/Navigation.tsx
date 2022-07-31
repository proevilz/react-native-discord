import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../Screens/Profile'
import TabBarIcon from '../components/TabBarIcon'
import ChatStack from './ChatStack'
import { StatusBar } from 'expo-status-bar'

const Tab = createBottomTabNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <StatusBar style='light' backgroundColor='#292b2f' />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={route.name}
                            color={color}
                            focused={focused}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#292b2f',
                        borderTopColor: '#292b2f',
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name='Home' component={ChatStack} />
                <Tab.Screen name='Profile' component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
