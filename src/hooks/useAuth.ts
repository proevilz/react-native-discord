import { Hub } from '@aws-amplify/core'
import { Auth } from '@aws-amplify/auth'
import { useEffect, useState } from 'react'

const getCurrentUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser()
  } catch (_a) {
    // currentAuthenticatedUser throws an Error if not signed in
    return null
  }
}
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const updateUser = async () => {
      setCurrentUser(await getCurrentUser())
      setLoading(false)
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser)
  }, [])

  return { currentUser, loading }
}

export default useAuth
export { getCurrentUser }
