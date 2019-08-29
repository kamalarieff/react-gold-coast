import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@mdi/react";
import { mdiMenu, mdiHome, mdiSquareIncCash } from "@mdi/js";

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={toggleDrawer}
          edge="start"
          color="inherit"
          aria-label="Menu"
        >
          <Icon path={mdiMenu} size={1} color="white" />
        </IconButton>
        <Typography variant="h6">Gold Coast</Typography>
      </Toolbar>
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          {[
            {
              text: "Home",
              path: "/",
              icon: <Icon path={mdiHome} size={1} color="black" />
            },
            {
              text: "Expenses",
              path: "/expenses",
              icon: <Icon path={mdiSquareIncCash} size={1} color="black" />
            },
            {
              text: "Todos",
              path: "/todos",
              icon: <Icon path={mdiSquareIncCash} size={1} color="black" />
            }
          ].map(item => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link to={item.path}>{item.text}</Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
