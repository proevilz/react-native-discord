import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/Navigation/Navigation'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import {
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
} from '@expo-google-fonts/rubik'
import { io } from 'socket.io-client'
import AuthState from './src/context/AuthContext'
import UiState from './src/context/UiContext'
import { store } from './src/store'
import { Provider } from 'react-redux'

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        await Font.loadAsync({
          Rubik_700Bold,
          Rubik_800ExtraBold,
          Rubik_900Black,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])
  const socket = io('ws://192.168.50.214:3000')

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Rubik_700Bold })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
        socket.emit('connection')
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  )
}
