import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";

import App from "./App";

const Root = () => {
  const mode = useSelector((state) => state.ui.themeMode || "light");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1d1d1d",
          },
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
