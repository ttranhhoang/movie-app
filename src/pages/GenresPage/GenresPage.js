import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import request from "api/request";
import GenresHeader from "./GenresHeader/GenresHeader";
import BackgroundHeader from "components/BackgroundHeader/BackgroundHeader";
import { Container } from "@material-ui/core";
import LoadMore from "components/LoadMore/LoadMore";
import MovieCards from "components/MovieCards/MovieCards";
import Loading from "components/Loading/Loading";
GenresPage.propTypes = {
  match: PropTypes.object,
};

function GenresPage(props) {
  const { match } = props;
  const { id } = match.params;
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const isRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await request.fetchGenres(id, page);
        if (isRef.current) {
          isRef.current = false;
          window.scrollTo(0, 0);

          setGenres(respone);
          console.log("Genres Page", respone);
          setLoading(false);
        } else {
          setHasMore(true);
          // dựa theo api mà dựa vào đó mà xét cho nó là object hay array {} []
          setGenres((gen) => ({
            ...gen,
            movies: {
              ...gen.movies,
              results: [...gen.movies.results, ...respone.movies.results],
            },
          }));
          setHasMore(false);
        }
      } catch (error) {
        console.log("Lỗi Genres Page", error);
      }
    };
    fetchData();
  }, [id, page]);
  const onLoadMore = () => {
    setPage((page) => page + 1);
  };
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <div>
      <BackgroundHeader
        children={
          <>
            <GenresHeader genresHeader={genres} />
          </>
        }
      />
      <Container>
        {" "}
        {genres.movies &&
          genres.movies.results.map((gen, index) => (
            <MovieCards key={index} infoCard={gen} media_type="movie" />
          ))}
        {genres.movies && page < genres.movies.total_pages && (
          <LoadMore loadMore={hasMore} handleClick={onLoadMore} />
        )}
      </Container>
    </div>
  );
}

export default GenresPage;
