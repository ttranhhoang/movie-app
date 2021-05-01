import { Box, makeStyles, Typography, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";

CategoryMovies.propTypes = {
  title: PropTypes.string,
  titleButton: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
CategoryMovies.defaultProps = {
  onChange: null,
};

const useStyle = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3.5),
    marginLeft: theme.spacing(2),
  },
}));

const CustomToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    borderRadius: "30px",
    border: "1px solid black",
    height: "2rem",
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      height: "2.5em",
    },
  },
}))(ToggleButtonGroup);
const StyledToggleButton = withStyles((theme) => ({
  root: {
    // Typography subtitle1
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: 1.75,
    letterSpacing: "0.00938em",

    color: theme.palette.primary.main,
    textTransform: "none",
    borderRadius: 15,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    "&$selected": {
      backgroundColor: theme.palette.primary.main,
      "& $label": {
        color: "#fff",
        // text gradient
        backgroundImage: "linear-gradient(to right, #74ebd5 0%, #9face6 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        // cho safari khong nhan WebkitBackgroundClip
        display: "inline",
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  selected: {},
  label: {},
}))(ToggleButton);
function CategoryMovies(props) {
  const {
    title,
    titleButton1,
    titleButton2,
    value,
    valueButton1,
    valueButton2,
    onChange,
  } = props;

  const classes = useStyle();
  return (
    <Box className={classes.box}>
      <Typography className={classes.typography} variant="h6">
        {title}
      </Typography>

      <CustomToggleButtonGroup
        value={value}
        exclusive
        size="small"
        onChange={onChange}
      >
        <StyledToggleButton value={valueButton1}>
          {titleButton1}
        </StyledToggleButton>

        <StyledToggleButton value={valueButton2}>
          {titleButton2}
        </StyledToggleButton>
      </CustomToggleButtonGroup>
    </Box>
  );
}

export default CategoryMovies;
