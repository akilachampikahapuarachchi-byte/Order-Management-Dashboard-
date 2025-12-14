import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 260;
  const handleMenuClick = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar onMenuClick={handleMenuClick} drawerWidth={drawerWidth} />
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleMenuClick} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
