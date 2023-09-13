import { Link, LinkProps as MuiLinkProps, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

interface PrimaryLinkProps extends MuiLinkProps {}

const PrimaryLink: FunctionComponent<PrimaryLinkProps> = ({
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Link
      variant="body2"
      color={theme.palette.link.main}
      underline="hover"
      sx={{
        cursor: "pointer",
        "&:hover": {
          color: theme.palette.link.dark,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
