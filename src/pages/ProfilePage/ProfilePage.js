import React, { useState } from "react";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import BackgroundHeader from "components/BackgroundHeader/BackgroundHeader";
import { useSelector } from "react-redux";
import Loading from "components/Loading/Loading";
import { Container, Grid, Typography} from "@material-ui/core";
import TabsProfile from "./TabsProfile/TabsProfile";
import SelectSort from "./SelectSort/SelectSort";
import MovieCardProfile from "./MovieCardProfile/MovieCardProfile";

function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const { watchlist, isLoading } = useSelector((state) => state.watchlist);
  const [valueType, setValueType] = useState("movie");
  const [valueSort, setValueSort] = useState("date_added");
  console.log("Authenticated", currentUser);
  console.log("database", watchlist);

  const handleChange = (event, newValue) => {
    setValueType(newValue);
  };
  const handleChangeSort = (event) => {
    setValueSort(event.target.value);
  };

  const asArray = Object.entries(watchlist);
  const movieList = asArray.filter(
    ([key, value]) => value.media_type === "movie"
  );
  console.log("Filter Movies list", movieList);

  const item = movieList.map((item) => item[1]);
  console.log("item", item);

  const tvList = asArray.filter(([key, value]) => value.media_type === "tv");
  console.log("Filter TV list", tvList);

  const sortMovieList = movieList.sort(([, a], [, b]) => a.id - b.id);
  console.log("sortMovieList", sortMovieList);
  return (
    <>
      <BackgroundHeader
        children={<HeaderProfile userName={currentUser} />}
      ></BackgroundHeader>
      <Container style={{ paddingTop: 20 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <TabsProfile
                valueType={valueType}
                total_movie={movieList.length}
                total_tv={tvList.length}
                handleChange={handleChange}
              />

              <SelectSort
                valueSort={valueSort}
                handleChange={handleChangeSort}
              />
            </Grid>
            {valueType === "movie" &&
              movieList.sort(([, a], [, b]) =>
                valueSort === "date_added"
                  ? new Date(a.createdAt) - new Date(b.createdAt)
                  : valueSort === "release_date"
                  ? new Date(a.release_date) - new Date(b.release_date)
                  : a.popularity - b.popularity
              ) &&
              (movieList.length > 0 ? (
                movieList.map((item, index) => (
                  <MovieCardProfile key={index} details={item[1]} />
                ))
              ) : (
                <Typography>Bạn chưa có danh sách phim yêu thích.</Typography>
              ))}
            {valueType === "tv" &&
              tvList.sort(([, a], [, b]) =>
                valueSort === "date_added"
                  ? new Date(a.createdAt) - new Date(b.createdAt)
                  : valueSort === "release_date"
                  ? new Date(a.release_date) - new Date(b.release_date)
                  : a.popularity - b.popularity
              ) &&
              (tvList.length > 0 ? (
                tvList.map((item, index) => (
                  <MovieCardProfile key={index} details={item[1]} />
                ))
              ) : (
                <Typography>Bạn chưa có danh sách phim yêu thích.</Typography>
              ))}
          </>
        )}
      </Container>
    </>
  );
}
export default ProfilePage;
