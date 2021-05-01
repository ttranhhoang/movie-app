import { Typography } from "@material-ui/core";
import MovieCards from "components/MovieCards/MovieCards";
import PropTypes from "prop-types";
import React from "react";
import SearchPagination from "../SearchPagination/SearchPagination";

TvShows.propTypes = {
  tvShows: PropTypes.object,
  params: PropTypes.object,
};
function TvShows(props) {
  const { tvShows, params } = props;
  console.log("tv search", tvShows);
  return (
    <>
      {tvShows && tvShows.results.length > 0 ? (
        tvShows.results.map((tvShow) => (
          <MovieCards
            key={tvShow.id}
            infoCard={tvShow}
            media_type={params.type}
          />
        ))
      ) : (
        <Typography>There are no tv Shows that matched your query.</Typography>
      )}
      <SearchPagination total_pages={tvShows.total_pages} params={params} />
    </>
  );
}

export default TvShows;
