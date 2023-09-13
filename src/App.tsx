import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Providers from "./providers/Providers";
import router from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
