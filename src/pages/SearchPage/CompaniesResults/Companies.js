import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, makeStyles } from "@material-ui/core";
import SearchPagination from "../SearchPagination/SearchPagination";
import { Link } from "react-router-dom";
Companies.propTypes = {
  companies: PropTypes.object,
  params: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  box: {
    borderBottom: "1px solid #111",
    display: "flex",
    alignItems: "center",
    height: theme.spacing(5),
  },
  boxCountry: {
    background: "gray",
    borderRadius: "5px",
    color: "#fff",
    padding: theme.spacing(0, 1),
    marginLeft: theme.spacing(1),
  },
  link: {
    display: "flex",
    color: "#111",
    "&:hover": {
      color: "#111",
      textDecoration: "none",
    },
  },
}));
function Companies(props) {
  const { companies, params } = props;
  const classes = useStyles();
  console.log("companies", companies);
  return (
    <div>
      {companies && companies.results.length > 0 ? (
        companies.results.map((company) => (
          <Box key={company.id} className={classes.box}>
            <Link
              to={`/companies/${company.name}/${company.id}`}
              className={classes.link}
            >
              {company.logo_path ? (
                <img
                  src={company.logo_path}
                  title={company.name}
                  alt={company.name}
                />
              ) : (
                <Typography>{company.name}</Typography>
              )}

              {company.origin_country && (
                <Box component="span" className={classes.boxCountry}>
                  {company.origin_country}
                </Box>
              )}
            </Link>
          </Box>
        ))
      ) : (
        <Typography>There are no companies that matched your query.</Typography>
      )}
      <SearchPagination total_pages={companies.total_pages} params={params} />
    </div>
  );
}

export default Companies;
