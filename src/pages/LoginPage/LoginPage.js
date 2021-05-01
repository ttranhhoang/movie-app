import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import ContentTop from "./ContentTop/ContentTop";
import LoginForm from "./LoginForm/LoginForm";
import { login } from "redux/actions/user";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(8),
    },
  },
}));

function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login(data))
      .then(() => history.push("/"))
      .catch(() => {});
    console.log("user name login", data);
  };
  return (
    <Container className={classes.container}>
      <ContentTop />
      <LoginForm error={error} isLoading={isLoading} onSubmit={onSubmit} />
    </Container>
  );
}

export default LoginPage;
