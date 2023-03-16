import { Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PostTag from "./PostTag";

const addItems = (tags: string[], ...values: string[]) => {
  // value가 이미 포함되어있을 경우 리턴
  // if (tags.includes(value)) return tags;
  // value를 추가하고 새로운 배열을 리턴
  return [...tags, ...values];
};

const removeTag = () => {
  //
};

export default function PostForm() {
  const [tagValue, setTagValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.at(-1) === ",") return;
    setTagValue(value);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter" && e.code !== "Comma") return;
    if (tagValue === "") return;
    setTags((prev) => addItems(prev, tagValue));
    setTagValue("");
  };

  const handleTagDelete = (e: React.MouseEvent<HTMLElement>) => {
    const name = e.currentTarget.dataset.name;
    // setTags((prev) => prev.filter((v) => v === name));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        placeholder="제목을 입력하세요"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "2.125rem",
            fontWeight: "bold",
          },
        }}
      />
      <Divider sx={{ width: 100, borderWidth: 3, my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tags.map((v, i) => (
          <PostTag key={i} label={v} onDelete={handleTagDelete} />
        ))}
        <TextField
          placeholder="태그를 입력해주세요"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontWeight: "bold",
            },
          }}
          value={tagValue}
          onChange={handleTagChange}
          onKeyUp={handleTagAdd}
        />
      </Box>
    </Box>
  );
}
