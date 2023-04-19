import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  makeStyles,
  Fab,
  Tooltip,
  CardMedia,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ProgressCircle from "components/ProgressCircle/ProgressCircle";
import * as moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "redux/actions/watchlist";
import AlertComponent from "components/AlertComponent/AlertComponent";
import { FastAverageColor } from "fast-average-color";

Details.propTypes = {
  details: PropTypes.object,
  credits: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  back_drop: (props) => ({
    backgroundSize: "cover",
    backgroundImage: `url(${
      props.backdrop_path ? props.backdrop_path : props.poster_path
    })`,
    position: "relative",
    zIndex: 1,
    backgroundRepeat: "no-repeat",
  }),
  grid: {
    paddingTop: theme.spacing(7),
  },
  certification: {
    border: "1px solid",
    padding: "2px 4px",
  },
  container: {
    padding: theme.spacing(4, 4),
  },
  Fab: {
    position: "relative",
  },
  CircularProgress: {
    position: "absolute",
    top: 12,
    left: 12,
    color: "#90caf9",
  },
  alert: {
    position: "absolute",
    top: "65px",
    right: 0,
    [theme.breakpoints.down("sm")]: {
      right: 38,
    },
  },
}));

function Details(props) {
  const { details, created_by } = props;
  const classes = useStyles(details);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { watchlist, isLoading, isAdding, isRemoving } = useSelector(
    (state) => state.watchlist
  );
  console.log("watchlist details", watchlist);

  const handleAddmovie = () => {
    const movies = {
      id: details.id,
      media_type: details.media_type,
      title: details.title,
      poster_path: details.poster_path,
      release_date: details.release_date,
      overview: details.overview,
      vote_average: details.vote_average,
      popularity: details.popularity,
    };
    dispatch(addMovie(details.id, movies));
  };

  // render nặng nên dùng useCallback or useMemo
  const facColor = useCallback(() => {
    const fac = new FastAverageColor();
    const container = document.querySelector(".back");
    fac
      .getColorAsync(document.querySelector(".detailsImg"), {
        algorithm: "simple",
        ignoredColor: [
          [255, 255, 255, 255], // white,
        ],
      })
      .then((color) => {
        const colorEnd = [...color.value.slice(0, 3), 0.84].join(",");
        container.style.backgroundImage = `${
          matches
            ? `linear-gradient(to top, ${color.rgba} 150px, rgba(${colorEnd})100%)`
            : `linear-gradient(to right, ${color.rgba} 150px, rgba(${colorEnd})100%)`
        }`;
        container.style.color = color.isDark ? "#fff" : "#000";
      })
      .catch((e) => {
        console.log(e);
      });
  }, [matches]);

  useEffect(() => {
    facColor();
  }, [facColor]);

  // chuyển đổi Object thành Array để dùng Array method

  const added = Object.entries(watchlist).map((data) => data[0]);
  const trans = added.map((data) => parseInt(data));
  console.log("trans", trans);

  const isAdded = trans.some((movie) => movie === details.id);
  console.log("isAdded", isAdded);

  return (
    <div
      className={classes.back_drop}
      style={{
        backgroundPosition: `${matches ? "center" : "right -150px center"}`,
      }}
    >
      <div className="back">
        <Container className={classes.container}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
            className={classes.grid}
          >
            <Grid item md={3} xs={6}>
              <CardMedia
                className="detailsImg"
                component="img"
                image={details.poster_path}
                alt={details.title}
                title={details.title}
                loading="lazy"
                crossOrigin="true"
              />
            </Grid>
            <Grid item container md={9} xs={12} spacing={2}>
              <Grid item>
                <Typography variant="h4" className={classes.typography}>
                  {details.title}{" "}
                  <Typography component="span">
                    ({moment(new Date(details.release_date)).format("YYYY")})
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  {details.release_dates && (
                    <>
                      {details.release_dates.certification && (
                        <span className={classes.certification}>
                          {details.release_dates.certification}
                        </span>
                      )}{" "}
                      {details.release_dates.release_date && (
                        <span>
                          Ngày{" "}
                          {moment(
                            new Date(details.release_dates.release_date)
                          ).format("DD MMMM , YYYY")}
                        </span>
                      )}{" "}
                      {details.release_dates.iso_3166_1 && (
                        <span>
                          ({details.release_dates.iso_3166_1}){" \u2022 "}
                        </span>
                      )}
                    </>
                  )}
                  {details.genres &&
                    details.genres.map((gen, index) => (
                      <span key={gen.id}>
                        <Link to={`/genres/${gen.name}/${gen.id}`}>
                          {gen.name}
                        </Link>
                        {index < details.genres.length - 1 && ", "}
                      </span>
                    ))}

                  {details.runtime > 0 && (
                    <span>
                      {" \u2022 "}
                      {details.runtime >= 60
                        ? Math.floor(details.runtime / 60) +
                          "h " +
                          (details.runtime % 60) +
                          "m "
                        : details.runtime + "m"}
                    </span>
                  )}
                </Typography>
              </Grid>

              <Grid item container spacing={3} alignItems="center">
                <AlertComponent
                  openn={open}
                  severity="warning"
                  setOpenn={setOpen}
                  alertTitle="Bạn cần phải đăng nhập để thực hiện!"
                  className={classes.alert}
                />
                <Grid item>
                  <ProgressCircle
                    size={60}
                    value={details.vote_average}
                  ></ProgressCircle>
                </Grid>
                <Grid item>
                  <b>
                    User
                    <br />
                    Score
                  </b>
                </Grid>
                <Grid item className={classes.Fab}>
                  <Tooltip
                    arrow
                    title={
                      !isAuthenticated
                        ? "Đăng nhập để thêm phim vào danh sách yêu thích"
                        : !isAdded
                        ? "Thêm vào danh sách của bạn"
                        : "Xóa khỏi danh sách của bạn"
                    }
                  >
                    <Fab
                      color="primary"
                      size="medium"
                      onClick={
                        !isAuthenticated
                          ? () => setOpen(true)
                          : !isAdded
                          ? () => handleAddmovie()
                          : () => dispatch(removeMovie(details.id))
                      }
                    >
                      <BookmarkIcon
                        fontSize="small"
                        color={!isAdded ? "inherit" : "error"}
                      />
                    </Fab>
                  </Tooltip>
                  {(isLoading || isAdding || isRemoving) && (
                    <CircularProgress
                      size={50}
                      className={classes.CircularProgress}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item>
                  <Typography variant="h6">Tổng Quát</Typography>
                  <Typography variant="body2">{details.overview}</Typography>
                </Grid>
              </Grid>
              <Grid item container>
                {created_by &&
                  created_by.map((creator, index) => (
                    <Grid item key={index} md={4} xs={6}>
                      <Typography
                        component={Link}
                        to={`/person/${creator.name}/${creator.id}`}
                        variant="subtitle1"
                      >
                        {creator.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {creator.department ? creator.department : "Creator"}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
export default Details;
