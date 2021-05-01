import React from "react";
import {
  makeStyles,
  IconButton,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PropTypes from "prop-types";
import moment from "moment";
import ProgressCircle from "components/ProgressCircle/ProgressCircle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "redux/actions/watchlist";
MovieCardProfile.propTypes = {
  details: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  content: {
    flex: "1 0 auto",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      "&:last-child": {
        paddingBottom: theme.spacing(1),
      },
    },
  },
  doughnut: {
    width: "44px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    fontWeight: "bold",
  },
  truncate: {
    paddingTop: theme.spacing(3),

    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",

    [theme.breakpoints.down("sm")]: {
      WebkitLineClamp: 2,
      paddingTop: theme.spacing(2),
    },
  },
  cardMedia: {
    height: "100%",
    borderRadius: 0,
    width: 140,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  boxIcon: {
    position: "relative",
  },
  CircularProgress: {
    color: "#90caf9",
    position: "absolute",
    top: 12,
    left: 12,
  },
  boxTypography: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));

function MovieCardProfile(props) {
  const classes = useStyles();
  const { details } = props;
  console.log("testtest", details);
  const dispatch = useDispatch();
  const { isRemoving } = useSelector((state) => state.watchlist);

  // set truncate lấy theo ý muốn
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={`/${details.media_type}/${details.title}/${details.id}`}
          className={classes.cardMedia}
        >
          <CardMedia
            component="img"
            className={classes.cardMedia}
            image={details.poster_path}
            title={details.title}
          />
        </CardActionArea>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Box display="flex" alignItems="center">
              <Box className={classes.doughnut}>
                <ProgressCircle value={details.vote_average} size={40} />
              </Box>
              <Box className={classes.boxTypography}>
                <Typography
                  component={Link}
                  to={`/${details.media_type}/${details.title}/${details.id}`}
                  variant="subtitle1"
                  className={classes.link}
                >
                  {matches ? truncate(details.title, 20) : details.title}
                </Typography>
                {details.release_date && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {moment(new Date(details.release_date)).format(
                      "DD MMMM , YYYY"
                    )}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box mb={2} className={classes.truncate}>
              <Typography>{details.overview}</Typography>
            </Box>
          </CardContent>
        </div>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          className={classes.boxIcon}
        >
          <IconButton
            size="medium"
            onClick={() => dispatch(removeMovie(details.id))}
          >
            <HighlightOffIcon />
          </IconButton>
          {isRemoving && (
            <CircularProgress size={24} className={classes.CircularProgress} />
          )}
        </Box>
      </Card>
    </>
  );
}

export default MovieCardProfile;
