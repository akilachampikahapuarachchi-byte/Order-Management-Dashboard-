import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, hideSnackbar } from "../../features/ui/uiSlice";

const Topbar = ({ onMenuClick, drawerWidth = 0 }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.ui.themeMode);
  const snackbar = useSelector((state) => state.ui.snackbar);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: { md: "none" } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Product & Order Dashboard
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Topbar;
