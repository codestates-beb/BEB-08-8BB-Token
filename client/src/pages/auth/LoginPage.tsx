import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          label="Email Address"
          required
          fullWidth
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            Not a 8BBTOken user?
          </Grid>
          <Grid item>
            <Link href="/auth/join" rel="stylesheet">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
