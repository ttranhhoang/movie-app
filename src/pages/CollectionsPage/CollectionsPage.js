import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import request from "api/request";
import Loading from "components/Loading/Loading";
import Details from "components/Details/Details";
import Images from "assets/img";
import { no_image } from "assets/no_image";
import { Typography, Container } from "@material-ui/core";
import MovieCards from "components/MovieCards/MovieCards";
CollectionsPage.propTypes = {
  match: PropTypes.object,
};

function CollectionsPage(props) {
  const { match } = props;
  const { id } = match.params;
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const respone = await request.fetchCollections(id);
        const modifiedData = {
          ...respone,
          poster_path: respone.poster_path
            ? Images.baseurl_IMG + respone.poster_path
            : no_image,
          backdrop_path: respone.backdrop_path
            ? Images.baseurl_IMG + respone.backdrop_path
            : no_image,
          vote_average: respone.parts.reduce(
            (acc, cur) => acc + cur.vote_average / respone.parts.length,
            0
          ),
        };
        setCollections(modifiedData);
        setLoading(false);
        console.log("collections", modifiedData);
      } catch (error) {
        console.log("Lỗi Collections page", error.message);
      }
    };
    fetchData();
  }, [id]);
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <div>
      <Details details={collections} />
      <Container>
        {collections.parts.length > 1 ? (
          <Typography variant="h6" gutterBottom>
            {collections.parts.length} movies
          </Typography>
        ) : (
          <Typography variant="h6" gutterBottom>
            {collections.parts.length} movie
          </Typography>
        )}

        {collections.parts &&
          collections.parts.map((part) => (
            <MovieCards key={part.id} infoCard={part} media_type="movie" />
          ))}
      </Container>
    </div>
  );
}

export default CollectionsPage;
