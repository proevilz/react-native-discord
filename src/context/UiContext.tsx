import { createContext, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'

interface AppContextInterface {}
export const UiContext = createContext<AppContextInterface | null>(null)
const UiState = ({ children }) => {
    // const [bottomTabVisible, setBottomTabVisible] = useState(true)
    const bottomTabVisible = useSharedValue(false)
    const [visible, setVisible] = useState(true)
    return (
        <UiContext.Provider
            value={{
                visible,
                setVisible,
                bottomTabVisible,
                // setBottomTabVisible,
            }}
        >
            {children}
        </UiContext.Provider>
    )
}
export default UiState
