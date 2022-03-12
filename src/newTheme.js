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
      paper: '#66418f',
    },
    primary: {
      light: '#757ce8',
      main: '#963d9f',
      dark: '#d151de',
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
    color: '#d151de',
    fontFamily: ['"Spectral"', 'sans-serif'].join(','),
  },
});

export default newTheme;
