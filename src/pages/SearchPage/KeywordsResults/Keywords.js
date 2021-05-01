import React from "react";
import PropTypes from "prop-types";
import SearchPagination from "../SearchPagination/SearchPagination";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
Keywords.propTypes = {
  keywords: PropTypes.object,
  params: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "#111",
    "&:hover": {
      color: "#111",
      textDecoration: "none",
    },
  },
}));
function Keywords(props) {
  const { keywords, params } = props;
  const classes = useStyles();
  console.log("keywords", keywords);
  return (
    <>
      {keywords && keywords.results.length > 0 ? (
        keywords.results.map((keyword) => (
          <Typography key={keyword.id}>
            <Link
              to={`/keywords/${keyword.name}/${keyword.id}`}
              className={classes.link}
            >
              {keyword.name}
            </Link>
          </Typography>
        ))
      ) : (
        <Typography>There are no keywords that matched your query.</Typography>
      )}
      <SearchPagination total_pages={keywords.total_pages} params={params} />
    </>
  );
}

export default Keywords;
