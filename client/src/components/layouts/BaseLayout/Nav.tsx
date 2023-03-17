import PATH from "@/constants/path";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const pages = [
  {
    path: PATH.FAUCET,
    name: "Faucet",
  },
  {
    path: PATH.MARKET,
    name: "NFT Market",
  },
];

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Link key={page.path} to={page.path}>
          <Button
            variant="text"
            sx={{ my: 2, color: "black", display: "block" }}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
}
