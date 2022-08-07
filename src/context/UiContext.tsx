import { createContext, useState } from 'react'
import { SharedValue, useSharedValue } from 'react-native-reanimated'

interface AppContextInterface {
    bottomTabVisible: SharedValue<boolean>
}
export const UiContext = createContext<AppContextInterface | null>(null)
const UiState = ({ children }) => {
    const bottomTabVisible = useSharedValue(false)

    return (
        <UiContext.Provider
            value={{
                bottomTabVisible,
            }}
        >
            {children}
        </UiContext.Provider>
    )
}
export default UiState
