import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import request from "api/request";
import Loading from "components/Loading/Loading";
import CompanyHeader from "./CompanyHeader/CompanyHeader";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import { Container } from "@material-ui/core";
import Images from "assets/img";
import MovieCards from "components/MovieCards/MovieCards";
import BackgroundHeader from "components/BackgroundHeader/BackgroundHeader";
import LoadMore from "components/LoadMore/LoadMore";
CompanyPage.propTypes = {
  match: PropTypes.object,
};

function CompanyPage(props) {
  const { match } = props;
  const { id } = match.params;
  const [company, setCompany] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const isRef = useRef(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await request.fetchCompanies(id, page);
        // tránh việc re-rerendering trong data hạ tầng thì lưu thông tin về lần đầu render vào một reference
        // thì sử dụng useRef, việc update reference istRef.current = false sẽ không làm re-rendering
        if (isRef.current) {
          isRef.current = false;
          window.scrollTo(0, 0);
          const modifiedData = {
            ...respone,
            logo_path: respone.logo_path
              ? Images.baseurl_IMG + respone.logo_path
              : "",
          };
          setCompany(modifiedData);
          setLoading(false);
          console.log("Company", modifiedData);
        } else {
          setHasMore(true);
          // dựa theo api mà dựa vào đó mà xét cho nó là object hay array {} []
          setCompany((item) => ({
            ...item,
            movies: {
              ...item.movies,
              results: [...item.movies.results, ...respone.movies.results],
            },
          }));
          setHasMore(false);
        }
      } catch (error) {
        console.log("Lỗi CompanyPage", error);
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
    <>
      <BackgroundHeader
        children={
          <>
            <CompanyHeader companyHeader={company} />{" "}
            <CompanyInfo companyInfo={company} />
          </>
        }
      />
      <Container>
        <>
          {company.movies &&
            company.movies.results.map((movie) => (
              <MovieCards key={movie.id} infoCard={movie} media_type="movie" />
            ))}
          {page < company.movies.total_pages && (
            <LoadMore loadMore={hasMore} handleClick={onLoadMore} />
          )}
        </>
      </Container>
    </>
  );
}

export default CompanyPage;
