import { SimplePaletteColorOptions, createTheme } from "@mui/material";

// Custom colors
interface CustomPalette {
  input: SimplePaletteColorOptions;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides
    extends Record<keyof CustomPalette, true> {}
}

// Custom colors should have a placeholder
let theme = createTheme({
  palette: {
    primary: {
      main: "#FE8660",
    },
    text: {
      primary: "#4A4543",
      secondary: "#808080",
    },
    input: {
      main: "placeholder",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Halvetica", "Arial", "sans-serif"].join(","),
  },
});

// Custome colors here
theme = createTheme(theme, {
  palette: {
    input: theme.palette.augmentColor({
      color: {
        main: "#2D2D2D",
      },
      name: "input",
    }),
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          width: "100vw",
        },
        "*": {
          outline: "none",
        },
      },
    },
  },
});

export default theme;
