import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout = (props) => {
  return (
    <View
      className={
        'flex-1 ' +
        (props.routeName === 'friends'
          ? 'bg-discord-gray-5'
          : 'bg-discord-gray-3')
      }
    >
      <StatusBar style="light" />
      <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
        {props.children}
      </SafeAreaView>
    </View>
  )
}

export default Layout
