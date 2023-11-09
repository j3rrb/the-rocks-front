import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { toggle } from "../redux/slices/drawer";
import { useDispatch } from "react-redux";
import { Avatar, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const AppBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggle())}
          >
            <MenuIcon sx={{ color: "#FF5C00" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Rocks
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "transparent",
              ":hover": {
                borderColor: deepOrange[500],
              },
              color: deepOrange[500],
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  color: "black",
                  marginRight: 1,
                }}
              >
                U
              </Avatar>
              <Typography fontWeight="500" color="white">
                Usipav
              </Typography>
            </Box>
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
