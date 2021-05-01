import React from "react";
import PropTypes from "prop-types";
import Images from "assets/img";
import { Container, Toolbar, Typography, makeStyles } from "@material-ui/core";
GenresHeader.propTypes = {
  genresHeader: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(7),
    },
  },
  background: {
    backgroundImage: `url(${Images.backgroundHeader})`,
    backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",

    backgroundPosition: "center -250px",
    position: "relative",
    top: 0,
    left: 0,

    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center -150px",
    },
  },
}));
function GenresHeader(props) {
  const classes = useStyles();
  const { genresHeader } = props;
  console.log("header genres", genresHeader);
  return (
    <Container className={classes.background}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5">{genresHeader.name}</Typography>

        {/* Phải nhớ là bắt lỗi khi value underfine */}
        {genresHeader.movies && (
          <Typography variant="h6">
            {genresHeader.movies.total_results} movies
          </Typography>
        )}
      </Toolbar>
    </Container>
  );
}

export default GenresHeader;
