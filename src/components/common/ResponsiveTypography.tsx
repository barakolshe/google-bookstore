import useBreakpoint from "@/hooks/useBreakpoint";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
  Breakpoint,
  TypographyVariant,
} from "@mui/material";
import { FunctionComponent } from "react";

interface ResponsiveTypographyProps
  extends Omit<MuiTypographyProps, "variant"> {
  variants: { [key in Breakpoint]?: TypographyVariant };
}

const ResponsiveTypography: FunctionComponent<ResponsiveTypographyProps> = ({
  sx,
  children,
  variants,
  ...props
}) => {
  const currBreakpoint = useBreakpoint(
    Object.keys(variants) as Breakpoint[]
  ) as Breakpoint | null;

  return (
    <MuiTypography
      variant={currBreakpoint !== null ? variants[currBreakpoint] : undefined}
      sx={sx}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export default ResponsiveTypography;
