import PostList from "@/components/main/PostList";
import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

export default function MyPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <Box
      sx={{
        paddingY: 3,
      }}
    >
      <Container sx={{ mt: 2 }}>
        <Avatar sx={{ width: 150, height: 150 }} />
        <Typography sx={{ mt: 2 }} fontWeight="bold" fontSize={30}>
          NickName
        </Typography>
        <Typography sx={{ mt: 1, display: "inline" }}>
          0xf75189CFA50a668F31A01802B9418b3D2c6Efdc
        </Typography>
        <Tabs value={currentTab} onChange={handleTabChange} sx={{ mt: 3 }}>
          <Tab label="Post" />
          <Tab label="NFT" />
        </Tabs>
        <Box sx={{ py: 3 }}>
          <Box sx={{ display: currentTab === 0 ? "block" : "none" }}>
            <PostList />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
