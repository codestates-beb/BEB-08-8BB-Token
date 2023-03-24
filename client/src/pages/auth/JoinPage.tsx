import React, { useState } from "react";

import { useRecoilState } from "recoil";
import { userDataAtom } from "@/state/atom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function JoinPage() {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [nameValue, setNameValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const btnDisabled = !nameValue || !pwValue;

  let timer: any;
  const handleName = (e: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsNameValid(e.target.value);
      const checkDuplicate = userData.every(
        (el: { userInfo: { email: any } }) =>
          el.userInfo.email != e.target.value
      );
    }, 500);
  };

  const handlePw = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPwValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nickname"
                autoFocus
                onChange={handleName}
              />
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Is duplicate?
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePw}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={btnDisabled}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
