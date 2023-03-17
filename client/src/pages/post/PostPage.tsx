import CommentList from "@/components/post/comment/CommentList";
import Post from "@/components/post/Post";
import { Box, Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Container } from "@mui/system";
// import { useParams } from "react-router-dom";

export default function PostPage() {
  //  const { id } = useParams();

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingY: 3,
        bgcolor: grey[100],
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
