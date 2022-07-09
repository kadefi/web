import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#5b133f",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#097969",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#2E3033",
        },
        tooltip: {
          backgroundColor: "#2E3033",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          body1: "div",
          body2: "span",
        },
        variant: "body1",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
