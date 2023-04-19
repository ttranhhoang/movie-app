import {
  CardMedia,
  Grid,
  Button,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";
import Images from "assets/img";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  footer: {
    minWidth: 320,
    minHeight: 300,
    backgroundColor: "#032541",
    color: "#fff",
    marginTop: "-40px",

    padding: theme.spacing(8, 0),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(4),
    },
  },
  button: {
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "trasparent",
      color: "#fff",
      transition: "all 0.3s ease",
    },
  },
  GridImg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
    },
  },
  Grid: {
    display: "flex",
  },
  GridTypography: {
    "& > div > p > a": {
      display: "block",
      width: "fit-content",
      color: theme.palette.getContrastText(theme.palette.primary.main),
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  img: {
    borderRadius: 0,
    width: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },
}));
function Footer() {
  const classes = useStyles();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  return (
    <div className={classes.footer}>
      <Container maxWidth="md">
        <Grid container justify="space-between" spacing={4}>
          <Grid item md={3} xs={12} className={classes.GridImg}>
            <CardMedia
              component="img"
              image={Images.imgFooter}
              title="TMDB"
              alt="TMDB"
              className={classes.img}
            ></CardMedia>
            <Button variant="contained" className={classes.button}>
              {isAuthenticated
                ? `Chào, ${currentUser && currentUser.displayName}`
                : "Tham gia với chúng tôi"}
            </Button>
          </Grid>

          <Grid
            item
            md={9}
            xs={12}
            container
            justifyContent="space-between"
            className={classes.GridTypography}
          >
            <Grid item md="auto" xs={12}>
              <Typography variant="h5">Cơ Bản</Typography>
              <Typography>
                <Link to="#">Về TMDb</Link>
                <Link to="#">Liên hệ chúng tôi</Link>
                <Link to="#">Diễn đàn hỗ trợ</Link>
                <Link to="#">API</Link>
                <Link to="#">Trạng thái hệ thống</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h5">Tham Gia</Typography>
              <Typography>
                <Link to="#">Đóng góp</Link>
                <Link to="#">Ứng dụng bên thứ 3</Link>
                <Link to="#">Thêm phim mới</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h5">Cộng Đồng</Typography>
              <Typography>
                <Link to="#">Nguyên tắc</Link>
                <Link to="#">Thảo luận</Link>
                <Link to="#">Twitter</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h5">Hợp Pháp</Typography>
              <Typography>
                <Link to="#">Điều khoản sử dụng</Link>
                <Link to="#">Điều khoản sử dụng API</Link>
                <Link to="#">Chính sách bảo mật</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
