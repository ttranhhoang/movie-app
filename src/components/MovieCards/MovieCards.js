import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import Images from "assets/img";
import { no_image } from "assets/no_image";

MovieCards.propTypes = {
  infoCard: PropTypes.object,
  media_type: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 150,
    marginBottom: theme.spacing(2),
  },
  actionArea: {
    height: "100%",
    width: 100,
  },
  img: {
    height: "100%",
    width: 100,
    borderRadius: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  // Truncate multiple line
  noWrap: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",

    fontWeight: "bold",
  },
  // truncate mutiple text
  movie_overview: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,

    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

function MovieCards(props) {
  const { infoCard, media_type } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/${media_type}/${encodeURIComponent(
          infoCard.title ? infoCard.title : infoCard.name
        )}/${infoCard.id}`}
        className={classes.actionArea}
      >
        <CardMedia
          component="img"
          alt={infoCard.title ? infoCard.title : infoCard.name}
          image={
            infoCard.poster_path
              ? `${Images.baseurl_IMG}${infoCard.poster_path}`
              : `${no_image}`
          }
          title={infoCard.title ? infoCard.title : infoCard.name}
          className={classes.img}
        />
      </CardActionArea>
      <CardContent className={classes.content}>
        <div>
          <Typography
            variant="subtitle1"
            className={classes.noWrap}
            component={Link}
            to={`/${media_type}/${encodeURIComponent(
              infoCard.title ? infoCard.title : infoCard.name
            )}/${infoCard.id}`}
          >
            {infoCard.title ? infoCard.title : infoCard.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {/* {date ? moment(new Date(date)).format("MMMM DD, YYYY") : "Invalid"} */}
            {infoCard.release_date
              ? moment(new Date(infoCard.release_date)).format("DD MMMM , YYYY")
              : moment(new Date(infoCard.first_air_date)).format(
                  "DD MMMM, YYYY"
                )}
          </Typography>
        </div>

        <div className={classes.movie_overview}>
          <Typography variant="body1" component="p">
            {infoCard.overview}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieCards;
