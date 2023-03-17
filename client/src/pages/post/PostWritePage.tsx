import React from "react";
import { Box, Card, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import PostForm from "@/components/post/PostForm";

export default function PostWritePage() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 65px)",
        paddingY: 3,
      }}
    >
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Card sx={{ p: 3, height: "100%" }}>
          <PostForm />
        </Card>
      </Container>
    </Box>
  );
}
