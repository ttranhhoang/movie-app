import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  CardMedia,
  CardActionArea,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SearchPagination from "../SearchPagination/SearchPagination";
import Images from "assets/img";
import { no_image } from "assets/no_image/index";
import { Link } from "react-router-dom";

People.propTypes = {
  people: PropTypes.object,
  params: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  cardAction: {
    height: 70,
    width: 70,
  },
  cardMedia: {
    height: 70,
    width: 70,
    borderRadius: theme.spacing(1),
  },
  typography: {
    fontWeight: "bold",
    color: "#111",
    "&:hover": {
      textDecoration: "none",
      color: "#111",
    },
  },
  typographyBody: {
    color: "#111",
    "&:hover": {
      textDecoration: "none",
      color: "#111",
    },
  },
}));
function People(props) {
  const { people, params } = props;
  const classes = useStyles();
  console.log("people", people);
  return (
    <>
      {people && people.results.length > 0 ? (
        people.results.map((person) => (
          <Box key={person.id} display="flex" alignItems="center" mb={1}>
            <CardActionArea
              component={Link}
              to={`/person/${person.name}/${person.id}`}
              className={classes.cardAction}
            >
              <CardMedia
                component="img"
                alt={person.name}
                image={
                  person.profile_path
                    ? `${Images.baseurl_IMG}${person.profile_path}`
                    : `${no_image}`
                }
                title={person.name}
                className={classes.cardMedia}
              />
            </CardActionArea>
            <Box ml={2}>
              <Typography
                component={Link}
                to={`/${params.type}/${person.name}/${person.id}`}
                variant="subtitle1"
                className={classes.typography}
              >
                {person.name}
              </Typography>
              <Typography variant="body2">
                {person.known_for_department}
                {person.known_for && person.known_for.length > 0
                  ? ` * ${""}`
                  : ""}
                {person.known_for &&
                  person.known_for.map((movie, index) => (
                    <React.Fragment key={movie.id}>
                      <Link
                        to={`/${movie.media_type}/${
                          movie.title ? movie.title : movie.name
                        }/${movie.id}`}
                        className={classes.typographyBody}
                      >
                        {movie.title ? movie.title : movie.name}
                      </Link>
                      {index < person.known_for.length - 1 && ", "}
                    </React.Fragment>
                  ))}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>There are no people that matched your query.</Typography>
      )}
      <SearchPagination total_pages={people.total_pages} params={params} />
    </>
  );
}

export default People;
