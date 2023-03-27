import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import ImageInput from "./imageInput";

const theme = createTheme();

export default function MintForm({ onSubmit }: any) {
  const [title, settitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleNameChange = (e: any) => {
    settitle(e.currentTarget.value);
  };

  const handleImageChnage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (onSubmit) {
      onSubmit({
        title,
        image,
        description,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Minting NFT !
          </Typography>
          <Grid item sx={{ mt: 3, mb: 2 }}>
            이미지 업로드
            <ImageInput onChange={handleImageChnage} />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                variant="standard"
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="url"
                name="url"
                label="URL"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="comment"
                name="comment"
                label="Comment"
                fullWidth
                variant="standard"
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Minting
            </Button>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
