import { FunctionComponent } from "react";
import { LinkProps as MuiLinkProps } from "@mui/material";
import PrimaryLink from "./_links/PrimaryLink";

const variants = {
  primary: "primary",
} as const;

type VariantsTypes = (typeof variants)[keyof typeof variants]; // Get the union type of values

type LinkProps = Omit<MuiLinkProps, "variant"> & {
  variant?: VariantsTypes;
};

const Link: FunctionComponent<LinkProps> = ({ variant, ...props }) => {
  switch (variant) {
    case variants.primary:
      return <PrimaryLink {...props} />;
      break;
    default:
      return <PrimaryLink {...props} />;
      break;
  }
};

export default Link;
