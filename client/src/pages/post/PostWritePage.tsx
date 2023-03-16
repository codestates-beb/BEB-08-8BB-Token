import React from "react";
import { Box, Card, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import PostForm from "@/components/post/PostForm";

export default function PostWritePage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingY: 3,
        bgcolor: grey[100],
      }}
    >
      <Container>
        <Card sx={{ p: 3 }}>
          <PostForm />
        </Card>
      </Container>
    </Box>
  );
}
