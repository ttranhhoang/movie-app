import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import SignupForm from "./SignupForm/SignupForm";
import Benefits from "./Benefits/Benefits";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "redux/actions/user";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop: theme.spacing(5),
  },
}));
function SignUpPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(signup(data))
      .then(() => history.push("/"))
      .catch(() => {});
    console.log("user Signup", data);
  };
  return (
    <Container className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={3}>
          <Benefits />
        </Grid>
        <Grid item xs={12} md={9}>
          <SignupForm error={error} isLoading={isLoading} onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpPage;
