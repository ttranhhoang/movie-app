import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Tabs, Tab, makeStyles } from "@material-ui/core";
TabsProfile.propTypes = {
  valueType: PropTypes.string,
  handleChange: PropTypes.func,
  total_movie: PropTypes.number,
  total_tv: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    marginLeft: theme.spacing(2),
  },
  tabs: {
    minWidth: "6em",
    minHeight: "auto",
    "&.Mui-selected": {
      background: "#fff!important",
    },
  },
}));
function TabsProfile(props) {
  const classes = useStyles();
  const { valueType, handleChange, total_movie, total_tv } = props;
  return (
    <Grid item xs={12} md="auto" className={classes.grid}>
      <Typography variant="h5">Danh sách phim </Typography>
      <Tabs
        value={valueType}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        className={classes.tab}
      >
        <Tab
          label={`Movie ${total_movie}`}
          disableRipple
          value="movie"
          className={classes.tabs}
        />
        <Tab label={`Tv ${total_tv}`} value="tv" className={classes.tabs} />
      </Tabs>
    </Grid>
  );
}

export default TabsProfile;
