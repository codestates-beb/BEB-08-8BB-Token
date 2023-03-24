import { Chip, ChipProps } from "@mui/material";
import { grey } from "@mui/material/colors";

interface PostTagProps extends Omit<ChipProps, "onDelete"> {
  onDelete?(label?: ChipProps["label"]): void;
}

export default function PostTag({ onDelete, ...props }: PostTagProps) {
  const handleDelete = (callback: PostTagProps["onDelete"]) => {
    if (callback) return () => callback(props.label);
    return undefined;
  };
  return (
    <Chip
      sx={{
        color: "primary.main",
        px: 0.5,
        bgcolor: grey[100],
        fontWeight: "bold",
      }}
      onDelete={handleDelete(onDelete)}
      {...props}
    />
  );
}
