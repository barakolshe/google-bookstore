import AppBar from "@/components/layout/AppBar/AppBar";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <Stack direction="column" sx={{ minHeight: "inherit" }}>
      <AppBar />
      <Stack
        component="main"
        sx={{
          flexGrow: "1",
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default MainLayout;
