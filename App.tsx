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
// import { io } from 'socket.io-client'
import { store } from './src/store'
import { Provider, useDispatch } from 'react-redux'
import { Amplify, Hub } from '@aws-amplify/core'
import config from './src/aws-exports'
import { hubListener } from './src/utils'
import { updateAuthReady } from './src/slices/authSlice'
import useAuth from './src/hooks/useAuth'

export default function App(props) {
  SplashScreen.preventAutoHideAsync()
  const [appIsReady, setAppIsReady] = useState(false)

  Hub.listen('auth', (data) => hubListener(data, () => {}))
  Amplify.configure(config)
  // const { currentUser, loading } = useAuth()

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
  // const socket = io('ws://192.168.50.214:3000')

  if (!appIsReady) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation appIsReady={appIsReady} />
      </SafeAreaProvider>
    </Provider>
  )
}
