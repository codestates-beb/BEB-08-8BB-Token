import React, { useState } from "react";
import Box from "@mui/material/Box";

export default function ImageInput({ value, onChange }: any) {
  const [imageUrl, setImageUrl] = useState(value);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageUrl(e.target?.result);
      };
    }
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <Box>
      <input type="file" onChange={handleChange} />
      <img src={imageUrl} />
    </Box>
  );
}
