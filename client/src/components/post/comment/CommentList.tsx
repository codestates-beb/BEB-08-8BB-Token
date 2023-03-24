import { Stack } from "@mui/material";
import CommentCard from "./CommentCard";

export default function CommentList() {
  return (
    <Stack spacing={3}>
      {new Array(5).fill(0).map((v, i) => (
        <CommentCard key={i} />
      ))}
    </Stack>
  );
}
