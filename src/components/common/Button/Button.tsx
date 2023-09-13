import { ButtonProps as MuiButtonProps } from "@mui/material";
import { FunctionComponent } from "react";
import PrimaryButon from "./_buttons/PrimaryButton";

// Creating different variants of buttons
const variants = {
  primary: "primary",
} as const;

type VariantsTypes = (typeof variants)[keyof typeof variants];

type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: VariantsTypes;
};

const Button: FunctionComponent<ButtonProps> = ({ variant, ...props }) => {
  // Returning the correct variant
  switch (variant) {
    case variants.primary:
      return <PrimaryButon {...props} />;
      break;
    default:
      return <PrimaryButon {...props} />;
      break;
  }
};

export default Button;
