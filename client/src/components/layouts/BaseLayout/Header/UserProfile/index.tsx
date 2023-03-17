import PATH from "@/constants/path";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menus = [
  {
    path: PATH.MYPAGE,
    name: "Mypage",
  },
  {
    path: PATH.POST_WRITE,
    name: "New Post",
  },
  {
    path: PATH.HOME,
    name: "Logout",
  },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = (e: React.MouseEvent<HTMLElement>) => {
    const path = e.currentTarget.dataset.path;
    setAnchorEl(null);
    console.log(path);
    if (path) navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="open menu">
        <IconButton sx={{ p: 0 }} onClick={handleOpenMenu}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.path}
            data-path={menu.path}
            sx={{ width: 150 }}
            onClick={handleCloseMenu}
          >
            <Typography textAlign="center">{menu.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
