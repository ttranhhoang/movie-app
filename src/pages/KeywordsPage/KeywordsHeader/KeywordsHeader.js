import React from "react";
import PropTypes from "prop-types";
import { Container, Toolbar, Typography, makeStyles } from "@material-ui/core";
import Images from "assets/img";
KeywordsHeader.propTypes = {
  keywordsHeader: PropTypes.object,
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
function KeywordsHeader(props) {
  const classes = useStyles();
  const { keywordsHeader } = props;
  return (
    <Container className={classes.background}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5">{keywordsHeader.name}</Typography>

        {/* Phải nhớ là bắt lỗi khi value underfine */}
        {keywordsHeader.movies && (
          <Typography variant="h6">
            {keywordsHeader.movies.total_results} movies
          </Typography>
        )}
      </Toolbar>
    </Container>
  );
}

export default KeywordsHeader;
