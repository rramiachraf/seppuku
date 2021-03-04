import { useQuery } from '@apollo/client'
import React, { createContext, useContext, useState } from 'react'
import { GET_AUTH_USER } from '../queries'

interface AuthContextDefaults {
  authenticated: boolean | null
  user?: {
    name?: string
    picture?: string
  }
}

export const AuthContext = createContext({
  authenticated: null,
  user: {}
}) as React.Context<AuthContextDefaults>

type AuthenticatedType = [
  null | boolean,
  React.Dispatch<React.SetStateAction<null | boolean>>
]

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const [authenticated, setAuthenticatedState] = useState(
    null
  ) as AuthenticatedType
  const [user, setAuthenticatedUser] = useState({})

  const onCompleted = (data: any) => {
    if (data.me) {
      setAuthenticatedState(true)
      setAuthenticatedUser({ ...data.me })
    } else {
      setAuthenticatedState(false)
      setAuthenticatedUser({})
    }
  }

  useQuery(GET_AUTH_USER, {
    onCompleted,
    onError: () => setAuthenticatedState(false)
  })

  return (
    <AuthContext.Provider value={{ authenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
