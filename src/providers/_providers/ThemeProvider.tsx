import theme from "@/theme/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface ThemeProviderProps {
  children?: ReactNode;
}

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
