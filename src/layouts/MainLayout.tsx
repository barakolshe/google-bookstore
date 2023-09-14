import AppBar from "@/components/layout/AppBar";
import { Box } from "@mui/material";
import { useMeasure } from "@uidotdev/usehooks";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  const [ref, { height: measuredHeight }] = useMeasure<HTMLDivElement>();

  const appbarHeight = measuredHeight ? measuredHeight + 1 : 0;

  return (
    <>
      <AppBar ref={ref} />
      <Box
        component="main"
        sx={{
          minHeight: `calc(100vh - ${appbarHeight}px)`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
