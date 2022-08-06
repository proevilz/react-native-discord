import { createContext, useState } from 'react'

interface AppContextInterface {
  authedUser: {
    id: number
    avatar: string
    username: string
    status: number
  }
}
const AuthContext = ({ children }) => {
  const AuthContext = createContext<AppContextInterface | null>(null)

  const [authedUser, setAuthedUser] = useState({
    id: 1,
    avatar: 'https://robohash.org/nisiestnesciunt.jpg?size=50x50&set=set1',
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
export default AuthContext
