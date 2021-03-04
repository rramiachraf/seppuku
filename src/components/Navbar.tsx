import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { AuthenticatedUser } from './AuthenticatedUser'

export const Navbar = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Container maxWidth="md">
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6">Seppuku</Typography>
          <AuthenticatedUser />
        </Grid>
      </Container>
    </Toolbar>
  </AppBar>
)
