import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { Card, makeStyles, useMediaQuery } from "@material-ui/core";

TabResults.propTypes = {
  totalMovies: PropTypes.number,
  totalTvShows: PropTypes.number,
  totalPeople: PropTypes.number,
  totalCompanies: PropTypes.number,
  totalCollections: PropTypes.number,
  totalKeyWords: PropTypes.number,

  params: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "rgba(20,40,81)",
    color: "#fff",
    padding: theme.spacing(2),
  },
  tabs: {
    "& a": {
      textTransform: "none",
    },
    "& a:hover": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  tab: {
    "&.Mui-selected": {
      backgroundColor: theme.palette.action.disabledBackground,
      fontWeight: "bold",
    },
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: "inherit",
  },
  span: {
    border: "1px solid #111",
    borderRadius: 10,
    padding: "0 5px",
    [theme.breakpoints.down("sm")]:{
      marginLeft: theme.spacing(1),
    }
  },
}));
function TabResults(props) {
  const {
    totalMovies,
    totalTvShows,
    totalPeople,
    totalCompanies,
    totalCollections,
    totalKeyWords,

    params,
  } = props;
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const allTabs = [
    {
      title: "Movies",
      type: "movie",
      totalResults: totalMovies,
    },
    { title: "Tv Shows", type: "tv", totalResults: totalTvShows },
    { title: "Mọi Người", type: "people", totalResults: totalPeople },
    { title: "Công Ty", type: "companies", totalResults: totalCompanies },
    {
      title: "Bộ Sưu Tập",
      type: "collections",
      totalResults: totalCollections,
    },
    { title: "Từ Khóa", type: "keywords", totalResults: totalKeyWords },
  ];
  return (
    <Card>
      <Box className={classes.box}>
        <Typography variant="h6">Search Results</Typography>
      </Box>
      <Tabs
        orientation={matches ? "horizontal" : "vertical"}
        variant={matches ? "scrollable" : "fullWidth"}
        scrollButtons="on"
        value={params.type}
        indicatorColor="primary"
        className={classes.tabs}
      >
        {allTabs.map((tab) => (
          <Tab
            key={tab.type}
            component={Link}
            to={`/search/${tab.type}/page1/${params.query}`}
            selected={tab.type === params.type}
            value={tab.type}
            className={classes.tab}
            label={
              <Typography className={classes.label}>
                {tab.title}
                <span className={classes.span}>{tab.totalResults}</span>
              </Typography>
            }
          />
        ))}
      </Tabs>
    </Card>
  );
}

export default TabResults;
