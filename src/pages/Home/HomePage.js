import { Container, Fade, makeStyles } from "@material-ui/core";
import request from "api/request";
import React, { useEffect, useState } from "react";
import About from "./About/About";
import Banner from "./Banner/Banner";
import CategoryMovies from "./CategoryMovies.js/CategoryMovies";
import ListMovies from "./ListMovies/ListMovies";
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}));
function HomePage() {
  // State Banner
  const [movie, setMovie] = useState([]);
  // State list popular movies
  const [popular, setPopular] = useState([]);
  const [type, setType] = useState("movie");
  //State list trending movie
  const [trending, setTrending] = useState([]);
  const [time, setTime] = useState("day");

  const [typeChecked, setTypeChecked] = useState(false);
  const [timeChecked, setTimeChecked] = useState(false);

  const timeout = 300;
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          media_type: "movie",
          time_window: "week",
        };

        const respone = await request.fecthTrending(
          params.media_type,
          params.time_window
        );
        const randomBackDrop =
          respone.results[Math.floor(Math.random() * respone.results.length)];
        console.log("Results Home", randomBackDrop);

        setMovie(randomBackDrop);
        return randomBackDrop;
      } catch (error) {
        console.log("Lỗi random banner", error);
      }
    };
    fetchData();
  }, []);

  //Load api từng thể loại
  // api của Popular
  useEffect(() => {
    setTypeChecked(false);
    const fetchData = setTimeout(async () => {
      try {
        const respone = await request.fetchPopular(type);
        // thêm dữ liệu cho api mà api k có
        const modifiedData = respone.results.map((movie) => ({
          ...movie,
          media_type: type,
        }));

        setPopular(modifiedData);
        setTypeChecked(true);
        console.log("Popular Home", modifiedData);
      } catch (error) {
        console.log("Lỗi Popular home", error.message);
      }
    }, timeout);
    return () => {
      clearTimeout(fetchData);
    };
  }, [type]);
  const handleButtonChangePopular = (event, newValueType) => {
    if (newValueType !== null) {
      setType(newValueType);
    }
  };
  // api của Trending
  useEffect(() => {
    setTimeChecked(false);
    const fetchData = setTimeout(async () => {
      try {
        const params = {
          media_type: "tv",
        };
        const respone = await request.fecthTrending(params.media_type, time);
        setTrending(respone.results);
        setTimeChecked(true);
        console.log("Trending Home", respone.results);
      } catch (error) {
        console.log("Lỗi Trending Home", error.message);
      }
    }, timeout);
    return () => {
      clearTimeout(fetchData);
    };
  }, [time]);
  const handleButtonChangeTrending = (event, newValueTrending) => {
    if (newValueTrending !== null) {
      setTime(newValueTrending);
    }
  };
  return (
    <Container className={classes.container}>
      <Banner movie={movie} />
      <div>
        <CategoryMovies
          title="Phổ biến"
          value={type}
          titleButton1="Movies"
          titleButton2="Tv"
          valueButton1="movie"
          valueButton2="tv"
          onChange={handleButtonChangePopular}
        />
          <Fade in={typeChecked} timeout={timeout}>
            <div>
              <ListMovies movies={popular} />
            </div>
          </Fade>
      
        <CategoryMovies
          title="Xu hướng"
          value={time}
          titleButton1="Hôm nay"
          titleButton2="Tuần này"
          valueButton1="day"
          valueButton2="week"
          onChange={handleButtonChangeTrending}
        />
        <Fade in={timeChecked} timeout={timeout}>
          <div>
            <ListMovies movies={trending} />
          </div>
        </Fade>
      </div>

      <About />
    </Container>
  );
}

export default HomePage;
