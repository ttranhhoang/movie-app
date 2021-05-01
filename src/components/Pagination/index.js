import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

Paginations.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Paginations.defaultProps = {
  onPageChange: null,
};

function Paginations(props) {
  const { pagination, onPageChange } = props;
  // dữ liêu từ api
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  const handlePageChange = (newpage) => {
    if (onPageChange) {
      onPageChange(newpage);
    }
  };
  return (
    <div>
      <Pagination count={totalPages} onClick={() => handlePageChange(_page)} />
      <button disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>
        Prev
      </button>
      
      
      <button
        disabled={_page > totalPages}
        onClick={() => handlePageChange(_page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Paginations;
