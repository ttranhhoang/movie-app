import React, { useEffect, useState } from "react";
import Details from "components/Details/Details";
import request from "api/request";
import Loading from "components/Loading/Loading";
import Cast from "./Cast/Cast";
import Media from "./Media/Media";
import videos from "assets/videos/videos";
import Images from "assets/img";
import { Grid, Container, makeStyles } from "@material-ui/core";
import Recomments from "./Recomments/Recomments";
import Facts from "./Facts/Facts";
import { no_image } from "assets/no_image";
const useStyles = makeStyles((theme) => ({
  grid: {
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
    },
  },
}));
function MovieDetails(props) {
  const { match } = props;
  const classes = useStyles();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const respone = await request.fetchMovies(id);
        const modifiedData = {
          ...respone,
          media_type: "movie",
          backdrop_path:
            respone.backdrop_path === null
              ? ""
              : Images.baseurl_IMG + respone.backdrop_path,
          poster_path:
            respone.poster_path === null
              ? ""
              : Images.baseurl_IMG + respone.poster_path,
          release_dates: respone.release_dates.results[0]
            ? {
                certification:
                  respone.release_dates.results[0].release_dates[0]
                    .certification,
                release_date:
                  respone.release_dates.results[0].release_dates[0]
                    .release_date,
                iso_3166_1: respone.release_dates.results[0].iso_3166_1,
              }
            : {},
          recommendations: respone.recommendations.results.map((recomment) => ({
            ...recomment,
            poster_path: recomment.poster_path
              ? Images.baseurl_IMG + recomment.poster_path
              : no_image,
          })),
          videos: respone.videos.results[0]
            ? {
                ...respone.videos.results[0],
                key: videos.videos_url + respone.videos.results[0].key,
              }
            : {},
          keywords: respone.keywords.keywords,
        };
        setMovieDetails(modifiedData);
        // nếu kq có underfine thì cần loading để load kq lúc đầu trước khi trả về kq của data(images)
        setLoading(false);
        console.log("Details", modifiedData);
      } catch (error) {
        console.log("Lỗi movieDetails", error);
      }
    };
    fetchData();
  }, [id]);
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <>
      <Details
        details={movieDetails}
        created_by={movieDetails.credits.crew.slice(0, 3)}
      ></Details>

      <Container>
        {" "}
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} md={9}>
            <Cast
              credits={movieDetails.credits}
              type={movieDetails.media_type}
              name={movieDetails.title}
              id={movieDetails.id}
            />
            <Media media={movieDetails} />
            <Recomments
              recommendations={movieDetails.recommendations}
              type={movieDetails.media_type}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Facts facts={movieDetails} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MovieDetails;
