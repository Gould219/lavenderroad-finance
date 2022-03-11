//Your theme for the new stuff using material UI has been copied here so it doesn't conflict
import { createTheme } from '@material-ui/core/styles';

const newTheme = createTheme({
  palette: {
    type: 'dark',
    text: {
      primary: '#FFF',
    },
    background: {
      default: '#121212',
      paper: '#00000073',
    },
    primary: {
      light: '#757ce8',
      main: '#664b55',
      dark: '#3e2e34',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#000',
    },
  },
  typography: {
    color: '#3e2e34',
    fontFamily: ['"Spectral"', 'sans-serif'].join(','),
  },
});

export default newTheme;
