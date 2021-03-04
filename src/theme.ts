import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f6f8b',
      contrastText: '#fff'
    }
  },
  typography: {
    body2: {
      color: '#d3d5fd'
    },
    button: {
      color: '#fff'
    }
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: '#e6dedd'
      }
    },
    MuiListItemText: {
      secondary: {
        color: '#e6dedd'
      }
    }
  }
})
