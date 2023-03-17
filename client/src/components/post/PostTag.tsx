import { Chip, ChipProps } from "@mui/material";
import { grey } from "@mui/material/colors";

type PostTagProps = ChipProps;

export default function PostTag({ onDelete, ...props }: PostTagProps) {
  const handleDelete = () => {
    if (onDelete) onDelete(props.label);
  };
  return (
    <Chip
      sx={{
        color: "primary.main",
        px: 0.5,
        bgcolor: grey[100],
        fontWeight: "bold",
      }}
      onDelete={handleDelete}
      {...props}
    />
  );
}
