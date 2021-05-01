import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
LastSeason.propTypes = {
  lastSeason: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  typography: {
    marginTop: "0.35rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    height: "200px",
    borderRadius: 0,
  },
  overview: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
function LastSeason(props) {
  const { lastSeason } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" gutterBottom className={classes.typography}>
        Last Season
      </Typography>

      <Card className={classes.root}>
        <CardMedia
          component="img"
          className={classes.cover}
          image={lastSeason.poster_path}
          title={lastSeason.name}
        />

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {lastSeason.name}
            </Typography>
            {lastSeason.air_date && (
              <Typography variant="subtitle1" color="textSecondary">
                {moment(new Date(lastSeason.air_date)).format("YYYY")} |{" "}
                {lastSeason.episode_count} Episodes
              </Typography>
            )}
            {lastSeason.overview && (
              <div className={classes.overview}>
                <Typography variant="subtitle1" color="textSecondary">
                  {lastSeason.overview}
                </Typography>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
      <Divider />
    </div>
  );
}

export default LastSeason;
