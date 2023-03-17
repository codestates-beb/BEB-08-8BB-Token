import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PostTag from "./PostTag";
import PostContent from "./PostContent";

const testContent = "# Marked in browser\n\nRendered by **marked**.";

export default function Post() {
  return (
    <Container sx={{ pt: 3, pb: 8 }}>
      <Typography variant="h4" fontWeight="bold" component="h1">
        🧑🏻‍🏫 프론트엔드 기술 면접 단골 개념들 정리 (자바스크립 편)
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
        <Typography fontWeight="bold">leemember</Typography>
        <Typography fontSize={14} color="grey">
          2022년 3월 1일
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {["React", "javascript", "typescript"].map((v, i) => (
          <PostTag key={i} label={v} />
        ))}
      </Box>
      <Box sx={{ mt: 8 }}>
        <PostContent src={testContent} />
      </Box>
    </Container>
  );
}
