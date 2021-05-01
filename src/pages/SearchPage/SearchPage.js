import { Container, Grid, makeStyles } from "@material-ui/core";
import request from "api/request";
import Loading from "components/Loading/Loading";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Collections from "./CollectionsResults/Collections";
import Companies from "./CompaniesResults/Companies";
import Keywords from "./KeywordsResults/Keywords";
import Movie from "./MovieResults/Movie";
import People from "./PeopleResults/People";
import TabResults from "./TabResults/TabResults";
import TvShows from "./TvShowsResults/TvShows";

SearchPage.propTypes = {
  match: PropTypes.object,
};
SearchPage.defaultProps = {
  match: null,
};
const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem",
    },
  },
}));
function SearchPage(props) {
  const { match } = props;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(true);
  const params = match.params;
  const page = parseInt(params.page);
  const { query, type } = params;

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //scrollTop mỗi lần load pagination
        window.scrollTo(0, 0);

        setPaginationLoading(true);
        console.log("change page");
        const searchMovies = await request.searchMovies(query, page);
        const searchTvShows = await request.searchTVShows(query, page);
        const searchPeople = await request.searchPeople(query, page);
        const searchCompanies = await request.searchCompanies(query, page);
        const searchCollections = await request.searchCollections(query, page);
        const searchKeywords = await request.searchKeywords(query, page);

        // lấy hết tất cả api bằng Promise.all
        const searchResults = await Promise.all([
          searchMovies,
          searchTvShows,
          searchPeople,
          searchCompanies,
          searchCollections,
          searchKeywords,
        ]);
        const [
          movies,
          tvShows,
          people,
          companies,
          collections,
          keywords,
        ] = searchResults;

        setResults({
          movies,
          tvShows,
          people,
          companies,
          collections,
          keywords,
        });
        setLoading(false);
        setPaginationLoading(false);
        console.log("not change");
      } catch (error) {
        console.log("Lỗi searchpage", error.message);
      }
    };
    fetchData();
  }, [query, page, setPaginationLoading]);

  return loading ? (
    <Loading height="90vh" />
  ) : (
    <Container>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item md={3} xs={12}>
          <TabResults
            params={params}
            totalMovies={results.movies.total_results}
            totalTvShows={results.tvShows.total_results}
            totalPeople={results.people.total_results}
            totalCompanies={results.companies.total_results}
            totalCollections={results.collections.total_results}
            totalKeyWords={results.keywords.total_results}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {paginationLoading ? (
            <Loading height={350} />
          ) : (
            <>
              {type === "movie" && (
                <Movie movies={results.movies} params={params} />
              )}
              {type === "tv" && (
                <TvShows tvShows={results.tvShows} params={params} />
              )}
              {type === "people" && (
                <People people={results.people} params={params} />
              )}
              {type === "companies" && (
                <Companies companies={results.companies} params={params} />
              )}
              {type === "collections" && (
                <Collections
                  collections={results.collections}
                  params={params}
                />
              )}
              {type === "keywords" && (
                <Keywords keywords={results.keywords} params={params} />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchPage;
