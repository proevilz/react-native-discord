import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Friends from '../Screens/DirectMessages'
import Chat from '../Screens/Chat'
import Welcome from '../Screens/auth/Welcome'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  )
}

export default AuthStack
