import styled from "@emotion/styled";
import { Button, Divider, TextField, Box } from "@mui/material";
import React, { useState } from "react";
import PostTag from "./PostTag";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PostContent from "./PostContent";

const addItems = (tags: string[], ...values: string[]) => {
  const diff = values.filter((v) => !tags.includes(v));

  return [...tags, ...diff];
};

const removeTag = (tags: string[], value: string) => {
  return tags.filter((v) => v !== value);
};

export default function PostForm() {
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
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
    const values = tagValue.split(",");
    setTags((prev) => addItems(prev, ...values));
    setTagValue("");
  };

  const handleTagRemove = (name?: string) => {
    if (!name) return;
    setTags((prev) => removeTag(prev, name));
  };

  const handlePreviewToggle = () => {
    setIsPreview(!isPreview);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
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
        onChange={handleTitleChange}
      />
      <Divider sx={{ width: 100, borderWidth: 3, my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tags.map((v, i) => (
          <PostTag key={i} label={v} onDelete={handleTagRemove} />
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
      <Box
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, mt: 3 }}
      >
        {isPreview ? (
          <PostContent src={content} />
        ) : (
          <Content
            placeholder="여기에 글을 입력해주세요"
            value={content}
            onChange={handleContentChange}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          columnGap: 1,
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        {isPreview ? (
          <Button
            type="button"
            onClick={handlePreviewToggle}
            startIcon={<CreateIcon />}
            color="inherit"
          >
            작성하기
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handlePreviewToggle}
            startIcon={<VisibilityIcon />}
            color="inherit"
          >
            미리보기
          </Button>
        )}
        <Button type="button" variant="contained" onClick={handlePreviewToggle}>
          완료
        </Button>
      </Box>
    </Box>
  );
}

const Content = styled("textarea")`
  font: inherit;
  display: flex;
  flex-grow: 1;
  border: 0;
  resize: none;
  outline: none;
  font-size: 18px;

  ::placeholder {
    font-size: inherit;
  }
`;
