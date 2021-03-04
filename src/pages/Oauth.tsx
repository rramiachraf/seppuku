import { useMutation, gql } from '@apollo/client'
import React, { useEffect } from 'react'
import { parse as qsParse } from 'qs'
import { useHistory } from 'react-router-dom'

export const OauthPage = () => {
  const { push } = useHistory()
  const GET_TOKEN = gql`
    mutation getTokenMutation($code: String!) {
      getToken(code: $code)
    }
  `
  const [getToken, { data }] = useMutation(GET_TOKEN)

  useEffect(() => {
    const { code } = qsParse(document.location.search, {
      ignoreQueryPrefix: true
    })
    getToken({ variables: { code } }).then(() => {
      data.getToken === true && push('/')
    })
  }, [])
  return <div></div>
}
