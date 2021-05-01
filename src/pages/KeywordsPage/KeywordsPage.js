import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import request from "api/request";
import Loading from "components/Loading/Loading";
import BackgroundHeader from "components/BackgroundHeader/BackgroundHeader";
import KeywordsHeader from "./KeywordsHeader/KeywordsHeader";
import MovieCards from "components/MovieCards/MovieCards";
import { Container } from "@material-ui/core";
import LoadMore from "components/LoadMore/LoadMore";

KeywordsPage.propTypes = {
  match: PropTypes.object,
};

function KeywordsPage(props) {
  const { match } = props;
  const { id } = match.params;

  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRef = useRef(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await request.fetchKeywords(id, page);
        // tránh việc re-rerendering trong data hạ tầng thì lưu thông tin về lần đầu render vào một reference
        // thì sử dụng useRef, việc update reference istRef.current = false sẽ không làm re-rendering
        if (isRef.current) {
          isRef.current = false;
          window.scrollTo(0, 0);

          setKeywords(respone);
          console.log("Keyword Page", respone);
          setLoading(false);
        } else {
          setHasMore(true);
          // dựa theo api mà dựa vào đó mà xét cho nó là object hay array {} []
          setKeywords((keyword) => ({
            ...keyword,
            movies: {
              ...keyword.movies,
              results: [...keyword.movies.results, ...respone.movies.results],
            },
          }));
          setHasMore(false);
        }
      } catch (error) {
        console.log("Lỗi KeywordPage", error);
      }
    };
    fetchData();
    // eslint-disable-line react-hooks/exhaustive-deps
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
            <KeywordsHeader keywordsHeader={keywords} />
          </>
        }
      />
      <Container>
        {" "}
        {keywords.movies &&
          keywords.movies.results.map((keyword, index) => (
            <MovieCards key={index} infoCard={keyword} media_type="movie" />
          ))}
        {keywords.movies && page < keywords.movies.total_pages && (
          <LoadMore loadMore={hasMore} handleClick={onLoadMore} />
        )}
      </Container>
    </div>
  );
}

export default KeywordsPage;
