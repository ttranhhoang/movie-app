import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

BackgroundHeader.propTypes = {
  children: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  background: {
    position: "relative",
    top: 0,
    left: 0,
    backgroundColor: "#0a1526",
    backgroundImage: `radial-gradient(at 30% top, #073844 0%, rgba(3,37,65, 1) 70%)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0px 0px",
    color: "#fff",
  },
}));
function BackgroundHeader(props) {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.background}>{children}</div>;
}

export default BackgroundHeader;
