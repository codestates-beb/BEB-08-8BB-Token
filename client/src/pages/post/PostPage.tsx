import CommentList from "@/components/post/comment/CommentList";
import Post from "@/components/post/Post";
import { Box, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
// import { useParams } from "react-router-dom";

export default function PostPage() {
  //  const { id } = useParams();

  return (
    <Box
      sx={{
        paddingY: 3,
      }}
    >
      <Container>
        <Card>
          <Post />
        </Card>
        <Typography variant="h5" fontWeight="bold" sx={{ paddingY: 3 }}>
          댓글
        </Typography>
        <CommentList />
      </Container>
    </Box>
  );
}
