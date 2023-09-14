import { Typography, TypographyProps } from "@mui/material";
import { FunctionComponent } from "react";

interface ErrorProps extends TypographyProps {}

const Error: FunctionComponent<ErrorProps> = ({ children, sx, ...props }) => {
  return (
    <Typography
      variant="h2"
      color="error"
      sx={{
        m: "auto auto",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Error;
