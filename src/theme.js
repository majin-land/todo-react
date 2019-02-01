import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00B7B2',
    },
    secondary: {
      main: '#3E5867',
    },
    text: {
      primary: '#324452',
    },
  },
  typography: {
    useNextVariants: true,
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

export default theme
