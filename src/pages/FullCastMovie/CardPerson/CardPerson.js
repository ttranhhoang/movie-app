import {
  makeStyles,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
} from "@material-ui/core";
import Images from "assets/img";
import PropTypes from "prop-types";
import { no_image } from "assets/no_image";
import { Link } from "react-router-dom";
import React from "react";
CardPerson.propTypes = {
  personCast: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 70,
    width: 70,
    borderRadius: 5,
  },
}));
function CardPerson(props) {
  const { personCast } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/person/${personCast.name}/${personCast.id}`}
        className={classes.cardMedia}
      >
        <CardMedia
          component="img"
          alt={personCast.name}
          image={`${
            personCast.profile_path
              ? `${Images.baseurl_IMG}${personCast.profile_path}`
              : `${no_image}`
          }`}
          title={personCast.name}
          className={classes.cardMedia}
        />
      </CardActionArea>

      <Box ml={2}>
        <Typography
          component={Link}
          to={`/person/${personCast.name}/${personCast.id}`}
          variant="subtitle1"
        >
          {personCast.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {personCast.character ? personCast.character : personCast.job}
        </Typography>
      </Box>
    </Box>
  );
}

export default CardPerson;
