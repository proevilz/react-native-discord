import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Register from '../Screens/auth/Register'
import Welcome from '../Screens/auth/Welcome'
import Login from '../Screens/auth/Login'
import RegisterSecond from '../Screens/auth/RegisterSecond'
const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterSecond" component={RegisterSecond} />
    </Stack.Navigator>
  )
}

export default AuthStack
