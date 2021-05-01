import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../Logout/Logout";
import { logout } from "redux/actions/user";

import AlertComponent from "components/AlertComponent/AlertComponent";
const useStyles = makeStyles((theme) => ({
  navRight: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    padding: theme.spacing(1),
    "& > a": {
      padding: theme.spacing(1.5),
      "&:hover": {
        transition: "all 0.3s ease",
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },
  icon: {
    display: " none",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },
  alert: {
    position: "absolute",
    top: theme.spacing(8),
    left: 0,
    right: 0,
  },
}));
function NavRight(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  console.log("currnetUSer", currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const open = Boolean(anchorEl);
  const [openn, setOpenn] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClick = () => {
    dispatch(logout())
      .then(() => history.push("/"))
      .then(() => setOpenn(true))
      .catch(() => {});
  };
  return (
    <>
      <AlertComponent
        alertTitle="Đăng xuất thành công"
        icon={<CheckCircleOutlineIcon fontSize="inherit" />}
        severity="info"
        openn={openn}
        setOpenn={setOpenn}
        className={classes.alert}
      />
      {isAuthenticated ? (
        <Logout
          userName={currentUser && currentUser.displayName}
          dispatchClick={onClick}
        />
      ) : (
        <div className={classes.navRight}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <PersonIcon className={classes.icon} />
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
              <Link to="/login">Đăng nhập</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/signup">Tham gia TMDb</Link>
            </MenuItem>
          </Menu>

          <Typography variant="subtitle1" className={classes.link}>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/signup">Tham gia TMDb</Link>
          </Typography>
        </div>
      )}
    </>
  );
}

export default NavRight;
