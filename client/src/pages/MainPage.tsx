import PostList from "@/components/main/PostList";
import { Box, Container } from "@mui/material";

export default function MainPage() {
  return (
    <Box
      sx={{
        paddingY: 3,
      }}
    >
      <Container>
        <PostList />
      </Container>
    </Box>
  );
}
