import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function BaseLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
