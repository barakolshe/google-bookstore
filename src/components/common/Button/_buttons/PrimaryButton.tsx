import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { FunctionComponent } from "react";

interface PrimaryButtonProps extends MuiButtonProps {}

const PrimaryButon: FunctionComponent<PrimaryButtonProps> = ({
  children,
  sx,
  ...props
}) => {
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

export default PrimaryButon;
