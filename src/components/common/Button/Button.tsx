import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { FunctionComponent } from "react";

interface ButtonProps extends MuiButtonProps {}

const Button: FunctionComponent<ButtonProps> = ({ children, sx, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      sx={{
        color: "common.white",
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
