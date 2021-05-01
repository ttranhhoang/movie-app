import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

Logout.propTypes = {
  userName: PropTypes.string,
  dispatchClick: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  logout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Logout(props) {
  const classes = useStyles();
  const { userName, dispatchClick } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const open = Boolean(anchorEl);
  console.log("Lgout user", userName);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    history.push("/profile");
  };
  return (
    <>
      <div className={classes.logout}>
        <Typography>{matches ? null : "Xin chào,"}</Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-logout"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar>{userName && userName[0]}</Avatar>
        </IconButton>
        <Menu
          id="menu-logout"
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
          <MenuItem
            onClick={() => {
              handleClose();
              handleClickProfile();
            }}
          >
            Danh sách yêu thích
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/setting");
            }}
          >
            Chỉnh sửa hồ sơ
          </MenuItem>
          <Divider />

          <MenuItem
            onClick={() => {
              handleClose();
              dispatchClick();
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default Logout;
