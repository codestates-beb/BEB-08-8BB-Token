import PostList from "@/components/main/PostList";
import { Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function MainPage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingY: 3,
        bgcolor: grey[100],
      }}
    >
      <Container>
        <PostList />
      </Container>
    </Box>
  );
}
