import { Typography } from "@material-ui/core";
import MovieCards from "components/MovieCards/MovieCards";
import PropTypes from "prop-types";
import React from "react";
import SearchPagination from "../SearchPagination/SearchPagination";

Movie.propTypes = {
  movies: PropTypes.object,
};

function Movie(props) {
  const { movies, params } = props;
  console.log("movies search", movies);
  return (
    <>
      {movies && movies.results.length > 0 ? (
        movies.results.map((movie) => (
          <MovieCards
            key={movie.id}
            infoCard={movie}

            media_type={params.type}
          />
        ))
      ) : (
        <Typography>There are no movies that matched your query.</Typography>
      )}
      <SearchPagination total_pages={movies.total_pages} params={params} />
    </>
  );
}

export default Movie;
