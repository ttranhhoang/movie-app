import React, { useEffect, useState } from "react";
import Details from "components/Details/Details";
import request from "api/request";
import Loading from "components/Loading/Loading";
import Cast from "pages/MovieDetails/Cast/Cast";
import Media from "pages/MovieDetails/Media/Media";
import Recomments from "pages/MovieDetails/Recomments/Recomments";
import Facts from "pages/MovieDetails/Facts/Facts";
import Images from "assets/img";
import { no_image } from "assets/no_image";
import videos from "assets/videos/videos";
import { Grid, Container } from "@material-ui/core";
import LastSeason from "./LastSeason/LastSeason";

function TvDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const [tvDetails, setTvDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      const respone = await request.fetchTv(id);
      const modifiedData = {
        ...respone,
        media_type: "tv",
        title: respone.name,
        release_date: respone.first_air_date,
        backdrop_path:
          respone.backdrop_path === null
            ? ""
            : Images.baseurl_IMG_DETAILS + respone.backdrop_path,
        poster_path:
          respone.poster_path === null
            ? ""
            : Images.baseurl_IMG_DETAILS + respone.poster_path,
        runtime: respone.episode_run_time[0],
        release_dates: respone.content_ratings.results[0]
          ? {
              iso_3166_1: respone.content_ratings.results[0].iso_3166_1,
              release_date: respone.first_air_date,
              certification: respone.content_ratings.results[0].rating,
            }
          : {},

        keywords: respone.keywords.results,
        networks: respone.networks[0]
          ? {
              ...respone.networks[0],
              logo_path: respone.networks[0].logo_path
                ? Images.baseurl_IMG_DETAILS + respone.networks[0].logo_path
                : "",
            }
          : {},
        recommendations: respone.recommendations.results.map(
          (recommendation) => ({
            ...recommendation,
            poster_path: recommendation.poster_path
              ? Images.baseurl_IMG_DETAILS + recommendation.poster_path
              : no_image,
          })
        ),
        seasons: respone.seasons.map((season) => ({
          ...season,
          poster_path: season.poster_path
            ? Images.baseurl_IMG_DETAILS + season.poster_path
            : no_image,
        })),
        videos: respone.videos.results[0]
          ? {
              ...respone.videos.results[0],
              key: videos.videos_url + respone.videos.results[0].key,
            }
          : {},
      };
      setTvDetails(modifiedData);
      setLoading(false);
      console.log("TV detail", modifiedData);
    };
    fetchData();
  }, [id]);
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <>
      <Details
        details={tvDetails}
        created_by={tvDetails.created_by.slice(0, 4)}
      ></Details>
      <Container>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Cast
              credits={tvDetails.credits}
              type={tvDetails.media_type}
              name={tvDetails.title}
              id={tvDetails.id}
            />
            <LastSeason
              lastSeason={tvDetails.seasons[tvDetails.seasons.length - 1]}
            />
            <Media media={tvDetails} />
            <Recomments
              recommendations={tvDetails.recommendations}
              type={tvDetails.media_type}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Facts facts={tvDetails} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TvDetails;
