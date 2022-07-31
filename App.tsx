import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/Navigation/Navigation'

export default function App(props) {
    return (
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    )
}
