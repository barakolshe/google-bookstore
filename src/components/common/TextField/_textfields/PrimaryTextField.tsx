import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { FunctionComponent, forwardRef } from "react";

type PrimaryTextFieldProps = MuiTextFieldProps & {};

const PrimaryTextField: FunctionComponent<PrimaryTextFieldProps> = forwardRef(
  ({ sx, ...props }, ref) => {
    return (
      <MuiTextField
        inputRef={ref}
        variant="outlined"
        sx={{
          ...sx,
        }}
        {...props}
      />
    );
  }
);

export default PrimaryTextField;
