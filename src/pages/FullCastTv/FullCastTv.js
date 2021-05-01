import React, { useState, useEffect } from "react";
import request from "api/request";
import Loading from "components/Loading/Loading";
import HeaderCast from "pages/FullCastMovie/HeaderCast/HeaderCast";
import Images from "assets/img";
import MovieCredits from "pages/FullCastMovie/MovieCredits/MovieCredits";
import sortByDepartment from "ulti/SortByDepartment/SortByDepartment";

function FullCastTv(props) {
  const [fullCastTv, setFullCastTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const { match } = props;
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const respone = await request.fetchTv(id);
        const modifiedData = {
          ...respone,
          type: "tv",
          backdrop_path: Images.baseurl_IMG + respone.backdrop_path,
          poster_path: Images.baseurl_IMG + respone.poster_path,
        };
        setFullCastTv(modifiedData);
        console.log("Full Cast TV", modifiedData);
        setLoading(false);
      } catch (error) {
        console.log("Lỗi Full Cast TV", error);
      }
    };
    fetchData();
  }, [id]);
  const sortCrew = !loading ? sortByDepartment(fullCastTv.credits.crew) : [];
  return loading ? (
    <Loading />
  ) : (
    <>
      <HeaderCast
        fullCast={fullCastTv}
        type={fullCastTv.type}
        id={fullCastTv.id}
        movie={fullCastTv.name}
      />
      <MovieCredits
        personCast={fullCastTv.credits.cast}
        personCrew={sortCrew}
      />
    </>
  );
}

export default FullCastTv;
