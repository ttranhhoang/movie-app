import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import MovieCards from "components/MovieCards/MovieCards";
import SearchPagination from "../SearchPagination/SearchPagination";

Collections.propTypes = {
  collections: PropTypes.object,
  params: PropTypes.object,
};

function Collections(props) {
  const { collections, params } = props;
  console.log("collections", collections);
  return (
    <>
      {collections && collections.results.length > 0 ? (
        collections.results.map((collection) => (
          <MovieCards
            key={collection.id}
            infoCard={collection}
            media_type={params.type}
          />
        ))
      ) : (
        <Typography>
          There are no collections that matched your query.
        </Typography>
      )}
      <SearchPagination total_pages={collections.total_pages} params={params} />
    </>
  );
}

export default Collections;
