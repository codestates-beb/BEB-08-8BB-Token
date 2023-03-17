import { Outlet } from "react-router-dom";
import { Container, Box, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

import Footer from "./Footer";

export default function AuthLayout() {
  return (
    <Box>
      <Box
        component="header"
        sx={{
          position: "relative",
          display: "flex",
          height: 65,
          alignItems: "center",
          boxShadow: 2,
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ marginRight: 3 }}>
              <Link to="/">
                <h2>LOGO</h2>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
