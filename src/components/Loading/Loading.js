import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

function Loading(props) {
  const { height } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}

export default Loading;
