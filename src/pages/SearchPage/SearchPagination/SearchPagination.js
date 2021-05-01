import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { Box, useMediaQuery } from "@material-ui/core";

SearchPagination.propTypes = {
  total_pages: PropTypes.number,
  params: PropTypes.object,
};

function SearchPagination(props) {
  const { total_pages, params } = props;
  const history = useHistory();
  const matches = useMediaQuery("(max-width:600px)");
  const handleChangePage = (event, newPage) => {
    history.push(`/search/${params.type}/page${newPage}/${params.query}`);
  };
  return (
    total_pages > 1 && (
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={total_pages}
          page={parseInt(params.page)}
          onChange={handleChangePage}
          shape="round"
          size={!matches ? "medium" : "small"}
        />
      </Box>
    )
  );
}

export default SearchPagination;
