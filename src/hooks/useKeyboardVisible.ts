import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export function useKeyboardVisible() {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

    useEffect(() => {
        console.log('triggered')
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) =>
            setIsKeyboardVisible(true)
        )
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
            setIsKeyboardVisible(false)
        )
        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [setIsKeyboardVisible])

    return isKeyboardVisible
}
