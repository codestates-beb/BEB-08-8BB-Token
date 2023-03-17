import PATH from "@/constants/path";
import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";

export default function PostList() {
  return (
    <Stack spacing={3}>
      {new Array(5).fill(0).map((v, i) => (
        <Link key={i} to={PATH.POST_ID.replace(":id", `${i + 1}`)}>
          <PostCard />
        </Link>
      ))}
    </Stack>
  );
}
