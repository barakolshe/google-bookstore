import { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { FunctionComponent, forwardRef } from "react";
import PrimaryTextField from "./_textfields/PrimaryTextField";

const variants = {
  primary: "primary",
} as const;

type VariantsTypes = (typeof variants)[keyof typeof variants]; // Get the union type of values

type TextFieldProps = Omit<MuiTextFieldProps, "variant"> & {
  variant?: VariantsTypes;
};

const TextField: FunctionComponent<TextFieldProps> = forwardRef(
  ({ variant, ...props }, ref) => {
    switch (variant) {
      case variants.primary:
        return <PrimaryTextField ref={ref} {...props} />;
        break;
      default:
        return <PrimaryTextField ref={ref} {...props} />;
        break;
    }
  }
);

export default TextField;
