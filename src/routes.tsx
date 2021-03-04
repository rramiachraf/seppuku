import { Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { App } from './App'
import { Navbar } from './components/Navbar'
import { AnimePage } from './pages/Anime'
import { OauthPage } from './pages/Oauth'

export const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Container maxWidth="md">
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/oauth" component={OauthPage} />
        <Route path="/anime/:animeID" component={AnimePage} />
      </Switch>
    </Container>
  </BrowserRouter>
)
