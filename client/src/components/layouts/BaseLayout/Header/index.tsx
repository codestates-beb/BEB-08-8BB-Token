import { Container, Button, Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserProfile from "./UserProfile";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLogin(true);
  };
  return (
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
          <Nav />
          {isLogin ? (
            <UserProfile />
          ) : (
            <Button variant="contained" onClick={handleLogin}>
              <Link to="/auth/login">LOGIN</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </Box>
  );
}
