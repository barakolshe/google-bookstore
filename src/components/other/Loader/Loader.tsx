import { CircularProgress, CircularProgressProps } from "@mui/material";
import { FunctionComponent } from "react";

interface LoaderProps extends CircularProgressProps {}

const Loader: FunctionComponent<LoaderProps> = ({ sx, ...props }) => {
  return (
    <CircularProgress
      sx={{
        m: "auto auto",
        ...sx,
      }}
      {...props}
    />
  );
};

export default Loader;
