import React from "react";
import {
  Grid,
  makeStyles,
  fade,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Images from "assets/img";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    minHeight: 350,
    backgroundImage: ` linear-gradient( ${fade(purple[800], 0.5)},
        ${fade(purple[800], 0.5)}), url(${Images.imgAbout})`,
    backgroundPosition: "top center",

    backgroundSize: "cover",
    padding: theme.spacing(0, 6),
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: purple[600],
    color: theme.palette.getContrastText(purple[800]),
    "&:hover": {
      backgroundColor: "#fff",
      color: "#111",
    },
  },
  ul: {
    [theme.breakpoints.down("sm")]: {
      // 20px === padding grid item
      padding: "20px ",
    },
  },
}));
function About(props) {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className={classes.backdrop}>
      <Box pt={3} mb={3}>
        <Typography variant="h4">Tham gia ngay</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item md={7} xs={12}>
          <Typography variant="subtitle1">
            Có quyền truy cập để duy trì danh sách cá nhân tùy chỉnh của riêng
            bạn, theo dõi những gì bạn đã xem và tìm kiếm và lọc những gì sẽ xem
            tiếp theo — bất kể đó là ở rạp, trên TV hay có sẵn trên các dịch vụ
            phát trực tuyến phổ biến như HBO Max, Peacock Premium, BBC America,
            và AHCTV.
          </Typography>
          {isAuthenticated ? null : (
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => history.push("/signup")}
            >
              Đăng Ký
            </Button>
          )}
        </Grid>

        <Grid item md={5} xs={12}>
          <ul className={classes.ul}>
            <Typography component="li">Tận hưởng TMDb</Typography>
            <Typography component="li">
              Duy trì danh sách theo dõi cá nhân
            </Typography>
            <Typography component="li">
              Lọc theo các dịch vụ phát trực tuyến đã đăng ký của bạn và tìm nội
              dung nào đó để xem
            </Typography>
            <Typography component="li">
              Ghi nhật ký các bộ phim và chương trình truyền hình bạn đã xem
            </Typography>
            <Typography component="li">Tạo danh sách tùy chỉnh </Typography>
            <Typography component="li">
              Đóng góp và cải thiện dữ liệu của chúng tôi
            </Typography>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
