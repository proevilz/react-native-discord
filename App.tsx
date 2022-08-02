import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/Navigation/Navigation'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Rubik_700Bold } from '@expo-google-fonts/rubik'
export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Rubik_700Bold })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Navigation />
    </SafeAreaProvider>
  )
}