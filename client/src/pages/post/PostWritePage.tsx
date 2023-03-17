import React from "react";
import { Box, Card, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import PostForm from "@/components/post/PostForm";

export default function PostWritePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingY: 3,
        bgcolor: grey[100],
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Card
          sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <PostForm />
        </Card>
      </Container>
    </Box>
  );
}
