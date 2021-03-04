import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useQuery } from '@apollo/client'

import { useAuthContext } from '../context/AuthContext'
import { GET_OAUTH_LINK } from '../queries'

export const AuthenticatedUser = () => {
  const { authenticated, user } = useAuthContext()
  const { loading: oauthLoading, data } = useQuery(GET_OAUTH_LINK)

  if (authenticated === null || oauthLoading)
    return <CircularProgress color="secondary" />

  if (authenticated) return <Avatar alt={user?.name} src={user?.picture} />

  return (
    <Button href={data.getOauthLink} variant="contained">
      Login
    </Button>
  )
}
