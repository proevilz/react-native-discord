import { createContext, useState } from 'react'

interface AppContextInterface {
    authedUser: {
        id: number
        avatar: string
        username: string
        status: number
    }
}
export const AuthContext = createContext<AppContextInterface | null>(null)

const AuthState = ({ children }) => {
    const [authedUser, setAuthedUser] = useState({
        id: 99,
        avatar: 'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
        username: 'ProEvilz',
        status: 4,
    })
    const sampleAppContext: AppContextInterface = {
        authedUser,
    }

    return (
        <AuthContext.Provider value={sampleAppContext}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthState
