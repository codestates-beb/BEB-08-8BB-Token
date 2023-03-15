import { Stack } from "@mui/material";
import React from "react";
import PostCard from "../PostCard";

export default function PostList() {
  return (
    <Stack spacing={3}>
      {new Array(5).fill(0).map((v, i) => (
        <PostCard key={i} />
      ))}
    </Stack>
  );
}
