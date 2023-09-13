import { CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";

interface LoadingPageProps {}

const LoadingPage: FunctionComponent<LoadingPageProps> = () => {
  return <CircularProgress color="primary" />;
};

export default LoadingPage;
