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
          minHeight: "100vh",
        },
        "*": {
          overflowX: "hidden",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
      // For making the input label invisible line disappear
      styleOverrides: {
        root: {
          legend: {
            span: {
              display: "none",
            },
          },
          input: {
            color: theme.palette.input.main,
          },

          ".MuiInputBase-root.Mui-focused > fieldset": {
            borderColor: theme.palette.text.primary,
          },
          ".MuiInputBase-root.Mui-focused.Mui-error > fieldset": {
            borderColor: theme.palette.error.main,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: "unset",
          transform: "unset",
          marginBottom: "2px",
          textAlign: "left",
          color: theme.palette.text.primary,
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
          "&.Mui-focused.Mui-error": {
            color: "error",
          },
        },
      },
    },
  },
});

export default theme;
