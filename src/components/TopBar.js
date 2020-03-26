import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            투표소맵
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
