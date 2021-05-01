import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  typography: {
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
function ContentTop(props) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Đăng nhập tài khoản của bạn
      </Typography>{" "}
      <Typography className={classes.typography}>
        Nếu bạn chưa có tài khoản, hãy đăng ký tài khoản miễn phí và đơn giản.{" "}
        <Link to="/signup" className={classes.link}>
          Nhấp vào đây {" "}
        </Link>
        để bắt đầu.
      </Typography>
    </>
  );
}

export default ContentTop;
