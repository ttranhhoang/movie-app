import {
  Box,
  CardActionArea,
  CardMedia,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Images from "assets/img";
import ProgressCircle from "components/ProgressCircle/ProgressCircle";
import PropTypes from "prop-types";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
ListMovies.propTypes = {
  movies: PropTypes.array,
};
ListMovies.defaultProps = {
  movies: null,
};

const useStyles = makeStyles((theme) => ({
  rootGirdList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    minHeight: 300,
    overflowY: "hidden",
    margin: theme.spacing(3),
  },
  girdList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    [theme.breakpoints.down("sm")]: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  typography: {
    fontWeight: 700,
    color: "#111",
  },
}));
function ListMovies(props) {
  const { movies } = props;
  const classes = useStyles();
  // const matches = useMediaQuery("(max-width:600px)");
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div className={classes.rootGirdList}>
      <GridList
        className={classes.girdList}
        cellHeight="auto"
        spacing={8}
        cols={matches ? 3.5 : 8.5}
      >
        {movies.map((movie) => (
          <GridListTile key={movie.id}>
            <CardActionArea>
              {/* encodeURIComponent giải quyết vấn đề ngay đường dẫn có %100 */}
              <Link
                to={`/${movie.media_type}/${encodeURIComponent(
                  movie.title ? movie.title : movie.name
                )}/${movie.id}`}
              >
                <CardMedia
                  component="img"
                  alt={`${movie.title}`}
                  image={`${Images.baseurl_IMG}${movie.poster_path}`}
                  title={movie.title ? movie.title : movie.name}
                />
              </Link>
            </CardActionArea>

            <Box p={1} pt={2} position="relative">
              <Box position="absolute" top={-20}>
                <ProgressCircle value={movie.vote_average} size={30} />
              </Box>

              <Typography
                component={Link}
                to={`/${movie.media_type}/${encodeURIComponent(
                  movie.title ? movie.title : movie.name
                )}/${movie.id}`}
                variant="subtitle2"
                className={classes.typography}
              >
                {movie.title ? movie.title : movie.name}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                <Moment format="DD MMM , YYYY">{movie.release_date}</Moment>
              </Typography>
            </Box>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default ListMovies;
