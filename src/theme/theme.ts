import { SimplePaletteColorOptions, createTheme } from "@mui/material";

// Custom colors
interface CustomPalette {
  search: SimplePaletteColorOptions;
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
      main: "rgb(35, 85, 148)",
    },
    text: {
      primary: "#4A4543",
      secondary: "#808080",
    },
    search: {
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
    search: theme.palette.augmentColor({
      color: {
        main: "rgba(35, 85, 148, 0.15)",
      },
      name: "search",
    }),
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          overflowX: "hidden",
        },
        "#root": {
          width: "100vw",
          minHeight: "inherit",
        },
        "*": {
          outline: "none",
        },
      },
    },
  },
});

export default theme;
