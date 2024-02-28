import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Default for smaller devices (no minimum width)
      sm: 640, // Equivalent to Tailwind's 'tablet'
      md: 1024, // Equivalent to Tailwind's 'laptop'
      lg: 1280, // Equivalent to Tailwind's 'desktop'
      xl: 1920, // Default for larger devices (no maximum width)
    },
  },
});

export default theme;
