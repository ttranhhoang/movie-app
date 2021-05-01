import { makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import Images from "assets/img";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import Search from "../Search/Search";

Banner.propTypes = {
  movie: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
Banner.defaultProps = {
  movie: null,
};
const useStyles = makeStyles((theme) => ({
  backdrop: (props) => ({
    backgroundImage: `linear-gradient(
        to right,
        rgba(3,37,65,0.8) 0%,
        rgba(3,37,65,0.9) 100%),
      url(${Images.baseurl_IMG}${props?.backdrop_path}`,
    backgroundSize: "cover",
    height: "350px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
  }),
  banner_info: {
    width: "95vw",
    padding: "3rem 3rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "4em 3em",
    },
  },
  banner_title: {
    padding: "24px",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
}));

function Banner(props) {
  const { movie } = props;
  const classes = useStyles(movie);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  // search
  const searchRef = useRef(null);
  useEffect(() => {
    const time = setTimeout(() => {
      // searchRef = Autocomplete > div > input
      searchRef.current.children[0].children[0].focus();
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <div
      className={classes.backdrop}
      style={{ backgroundPosition: `${matches ? "center" : "top center"}` }}
    >
      <div className={classes.banner_info}>
        <div className="banner_info">
          <div className={classes.banner_title}>
            <Typography variant="h3">{movie?.title}</Typography>
            <Typography variant="h6" gutterBottom>
              {truncate(movie?.overview, 40)}
            </Typography>
          </div>
          <Search searchRef={searchRef} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
