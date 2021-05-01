import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  GridList,
  CardMedia,
  CardActionArea,
  GridListTile,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
KnowFor.propTypes = {
  knowFor: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    marginBottom: "0 !important",
  },
  cardMedia: {
    height: "200px",
  },
  typography: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.35em",
  },
}));
function KnowFor(props) {
  const { knowFor } = props;
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Biết đến
      </Typography>
      <div className={classes.root}>
        <GridList
          className={classes.gridList}
          cellHeight="auto"
          spacing={8}
          cols={matches ? 2.5 : 5.5}
        >
          {knowFor.movie_credits.cast.slice(0, 15).map((movie_credit, index) => (
            <GridListTile key={index}>
              <CardActionArea
                component={Link}
                to={`/movie/${movie_credit.title}/${movie_credit.id}`}
                className={classes.cardAction}
              >
                <CardMedia
                  alt={movie_credit.title}
                  image={movie_credit.poster_path}
                  title={movie_credit.name}
                  className={classes.cardMedia}
                />
              </CardActionArea>
              <Typography
                className={classes.typography}
                component={Link}
                to={`/movie/${movie_credit.title}/${movie_credit.id}`}
              >
                {movie_credit.title}
              </Typography>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default KnowFor;
