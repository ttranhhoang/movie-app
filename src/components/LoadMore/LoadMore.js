import React from "react";
import PropTypes from "prop-types";
import { Button, Box, CircularProgress } from "@material-ui/core";

LoadMore.propTypes = {
  handleClick: PropTypes.func,
  loadMore: PropTypes.bool,
};

function LoadMore(props) {
  const { handleClick, loadMore } = props;
  return loadMore ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress color="inherit" />
    </Box>
  ) : (
    <Button
      variant="contained"
      size="large"
      color="primary"
      fullWidth
      onClick={handleClick}
      style={{ overflowAnchor: "none" }}
    >
      Load More
    </Button>
  );
}

export default LoadMore;
