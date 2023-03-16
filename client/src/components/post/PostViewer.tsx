import { Card, Chip, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { marked } from "marked";

const testContent = "# Marked in browser\n\nRendered by **marked**.";

export default function PostViewer() {
  const html = useMemo(() => marked.parse(testContent), []);
  return (
    <Card>
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
            <Chip
              key={i}
              label={v}
              sx={{
                color: "primary.main",
                px: 0.5,
                bgcolor: grey[100],
                fontWeight: "bold",
              }}
              onClick={() => console.log(`Tag ${v}`)}
            />
          ))}
        </Box>
        <Box sx={{ mt: 8 }} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Card>
  );
}
