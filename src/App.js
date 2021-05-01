import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "pages/SearchPage/SearchPage";
import Footer from "components/Footer/Footer";
import MovieDetails from "pages/MovieDetails/MovieDetails";
import TvDetails from "pages/TvDetails/TvDetails";
import PeopleDetails from "pages/PeopleDetails/PeopleDetails";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "ulti/CustomStyles";
import FullCastMovie from "pages/FullCastMovie/FullCastMovie";
import FullCastTv from "pages/FullCastTv/FullCastTv";
import CompanyPage from "pages/CompanyPage/CompanyPage";
import CollectionsPage from "pages/CollectionsPage/CollectionsPage";
import KeywordsPage from "pages/KeywordsPage/KeywordsPage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignUpPage from "pages/SignUpPage/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { fetchWatchlist } from "redux/actions/watchlist";
import GenresPage from "pages/GenresPage/GenresPage";
import SettingProfilePage from "pages/SettingProfilePage/SettingProfilePage";

function App() {
  // hạn chế tránh dùng useSelector trong App vì app là trang lớn nếu state trong redux changge
  // thì app sẽ phải reload tất cả trang con

  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWatchlist(currentUser.uid));
    }
  }, [dispatch, currentUser, isAuthenticated]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <Router>
            <Header />
            <main
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 320,
              }}
            >
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                  path="/search/:type/page:page/:query"
                  component={SearchPage}
                  exact
                />

                <Route path="/movie/:name/:id" exact component={MovieDetails} />
                <Route path="/tv/:name/:id" exact component={TvDetails} />
                <Route
                  path="/person/:name/:id"
                  exact
                  component={PeopleDetails}
                />
                <Route
                  path="/companies/:name/:id"
                  exact
                  component={CompanyPage}
                />
                <Route
                  path="/collections/:name/:id"
                  exact
                  component={CollectionsPage}
                />
                <Route
                  path="/keywords/:name/:id"
                  exact
                  component={KeywordsPage}
                />
                <Route path="/genres/:name/:id" exact component={GenresPage} />
                <Route
                  path="/cast/movie/:name/:id"
                  exact
                  component={FullCastMovie}
                />
                <Route exact path="/cast/tv/:name/:id" component={FullCastTv} />

                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignUpPage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/setting" component={SettingProfilePage}/>
              </Switch>
            </main>
            <Footer />
          </Router>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
