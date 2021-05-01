import React, { useState } from "react";
import Images from "assets/img";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  CardMedia,
  makeStyles,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navLeft: {
    display: "flex",
    alignItems: "center",
    padding: "inherit",
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },
  image: {
    width: 160,
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "35%",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  link: {
    padding: theme.spacing(1),
    "& > a": {
      marginLeft: theme.spacing(3),
      "&:hover": {
        transition: "all 0.3s ease",
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
function NavLeft(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div className={classes.navLeft}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/search/movie/page1/the">Movies</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/search/tv/page1/the">Tv Shows</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/search/people/page1/the">Mọi người</Link>
        </MenuItem>
      </Menu>

      <Link to="/">
        <CardMedia
          component="img"
          className={classes.image}
          image={Images.logoHeader}
          alt="TMDB"
        />
      </Link>
      <Typography variant="subtitle1" className={classes.link}>
        <Link to="/search/movie/page1/the">Movies</Link>
        <Link to="/search/tv/page1/the">Tv Shows</Link>
        <Link to="/search/people/page1/the">Mọi người</Link>
      </Typography>
    </div>
  );
}

export default NavLeft;
