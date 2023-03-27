import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentUserInfoAtom, userDataAtom } from "../../state/atom";

export default function LoginPage() {
  const setCurrentUser = useSetRecoilState(currentUserInfoAtom);
  const userData = useRecoilValue(userDataAtom);
  const [nameValue, setNameValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleName = (e: { target: { value: React.SetStateAction<string> } }) =>
    setNameValue(e.target.value);
  const handlePw = (e: { target: { value: React.SetStateAction<string> } }) =>
    setPwValue(e.target.value);

  useEffect(() => setAlertMessage(""));

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const relevantUser = userData.filter(
      (el) => el.userInfo.name === nameValue
    );
    if (!relevantUser.length) {
      setAlertMessage("존재하지 않는 아이디입니다.");
    } else {
      if (relevantUser[0].userInfo.password !== pwValue) {
        setAlertMessage("패스워드가 일치하지 않습니다.");
      } else {
        setCurrentUser(relevantUser[0]);
        localStorage.setItem("id", relevantUser[0].userInfo.id);
      }
    }
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
          Sign in
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nickname"
          label="Nickname"
          name="nickname"
          autoComplete="nickname"
          autoFocus
          onChange={handleName}
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="current-password"
          onChange={handlePw}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onChange={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            Not a 8BBTOken user?
          </Grid>
          <Grid item>
            <Link to="/auth/join" rel="stylesheet">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
