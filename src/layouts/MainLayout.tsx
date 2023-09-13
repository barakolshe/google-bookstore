import AppBar from "@/components/layout/AppBar";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <>
      <AppBar />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
