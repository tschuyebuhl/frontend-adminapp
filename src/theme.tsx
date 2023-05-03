import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#56c0f0', // your chosen color
      light: '#56c0f0', // lighter tint of the color
      dark: '#08638c', // darker shade of the color
      contrastText: '#fff', // text color to use on top of the color
    },
    secondary: {
      main: '#0d95d2', // your chosen color
      light: '#3eb7ed', // lighter tint of the color
      dark: '#0b84ba', // darker shade of the color
      contrastText: '#fff', // text color to use on top of the color
    },
    warning: {
      main: '#DC0404', // your chosen color
      light: '#E33A3A', // lighter tint of the color
      dark: '#A60000', // darker shade of the color
      contrastText: '#fff', // text color to use on top of the color
    },
  },
});

export default theme;