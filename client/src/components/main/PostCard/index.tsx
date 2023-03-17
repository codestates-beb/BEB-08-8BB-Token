import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";

export default function PostCard() {
  return (
    <Card
      sx={{
        border: 2,
        borderColor: "transparent",
        ":hover": {
          borderColor: "primary.main",
          boxShadow: 3,
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            R
          </Avatar>
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
      <CardActions>
        {/* <IconButton>
          <FavoriteIcon sx={{ color: "error.light" }} />
        </IconButton> */}
        <Button startIcon={<VisibilityIcon />} color="inherit" disableRipple>
          0
        </Button>
        <Button startIcon={<CommentIcon />} color="inherit">
          0
        </Button>
      </CardActions>
    </Card>
  );
}
