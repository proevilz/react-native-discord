import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'

interface IProps {
  bottomInset?: boolean
  routeName?: string
  children?: React.ReactNode | React.ReactNode[]
}
const Layout = (props: IProps) => {
  const authScreens = [
    'Welcome',
    'Login',
    'Register',
    'RegisterSecond',
    'Verification',
  ]
  return (
    <View
      className={
        'flex-1 ' +
        (props.routeName === 'friends'
          ? 'bg-discord-gray-5'
          : props.routeName && authScreens.includes(props.routeName)
          ? 'bg-discord-gray-2'
          : 'bg-discord-gray-3')
      }
    >
      <StatusBar style="light" />
      <SafeAreaView
        edges={
          props.bottomInset
            ? ['right', 'top', 'left', 'bottom']
            : ['right', 'top', 'left']
        }
        style={{ flex: 1 }}
      >
        {props.children}
      </SafeAreaView>
    </View>
  )
}

export default Layout
