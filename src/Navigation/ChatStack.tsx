import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Friends from '../Screens/DirectMessages'
import Chat from '../Screens/Chat'

const Stack = createNativeStackNavigator()

const ChatStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='Friends' component={Friends} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    )
}

export default ChatStack
