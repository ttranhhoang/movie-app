import request from "api/request";
import React, { useEffect, useState } from "react";
import Images from "assets/img";
import HeaderCast from "./HeaderCast/HeaderCast";
import MovieCredits from "./MovieCredits/MovieCredits";
import Loading from "components/Loading/Loading";
import sortByDepartment from "ulti/SortByDepartment/SortByDepartment";

function FullCastMovie(props) {
  const [fullcast, setFullCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const { match } = props;
  const { id } = match.params;
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const respone = await request.fetchMovies(id);
        const modifiedData = {
          ...respone,
          type: "movie",
          backdrop_path: Images.baseurl_IMG + respone.backdrop_path,
          poster_path: Images.baseurl_IMG + respone.poster_path,
        };
        setFullCast(modifiedData);
        setLoading(false);
        console.log("FullCast Movie", modifiedData);
      } catch (error) {
        console.log("Lỗi Full Cast Movie", error.message);
      }
    };
    fetchData();
  }, [id]);
  const sortCrew = !loading ? sortByDepartment(fullcast.credits.crew) : [];
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <>
      <HeaderCast
        fullCast={fullcast}
        type={fullcast.type}
        movie={fullcast.title}
        id={fullcast.id}
      ></HeaderCast>
      <MovieCredits personCast={fullcast.credits.cast} personCrew={sortCrew} />
    </>
  );
}

export default FullCastMovie;
