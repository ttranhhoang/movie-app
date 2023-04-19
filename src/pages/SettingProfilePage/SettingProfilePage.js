import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  makeStyles,
} from "@material-ui/core";
import SettingForm from "./SettingForm/SettingForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, logout } from "redux/actions/user";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "6rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5rem",
    },
  },
  card: {
    border: "1px solid #142851",
    width: "70%",
    margin: "auto",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
function SettingProfilePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, error, isLoading } = useSelector((state) => state.user);
  console.log("currentUser Setting form", currentUser);

  const onSubmit = async (data) => {
    try {
      dispatch(updateUser(data));
      if (!error) {
        setOpen(true);
      }
      console.log("change user name ", data);
    } catch (err) {
      console.log("Lỗi form", err);
    }
  };

  const onClickLogout = () => {
    dispatch(logout())
      .then(() => history.push("/login"))
      // .then(() => setOpen(true))
      .catch(() => {});
  };

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5">Chỉnh sửa hồ sơ</Typography>
              </Box>

              <SettingForm
                onSubmit={onSubmit}
                currentUser={currentUser}
                onClickLogout={onClickLogout}
                error={error}
                isLoading={isLoading}
                open={open}
                setOpen={setOpen}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SettingProfilePage;
