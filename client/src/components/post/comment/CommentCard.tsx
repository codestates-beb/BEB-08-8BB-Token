import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function CommentCard() {
  const [moreEl, setMoreEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setMoreEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMoreEl(null);
  };

  return (
    <Card
      sx={{
        border: 2,
        borderColor: "transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button startIcon={<VisibilityIcon />} color="inherit" disableRipple>
          0
        </Button>
      </CardActions> */}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={moreEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(moreEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <Typography textAlign="center">삭제</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
}
