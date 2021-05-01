import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Toolbar,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Images from "assets/img";
import moment from "moment";
HeaderProfile.propTypes = {
  userName: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
    },
  },
  background: {
    backgroundImage: `url(${Images.backgroundHeader})`,
    backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",

    backgroundPosition: "center -250px",
    position: "relative",
    top: 0,
    left: 0,

    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center 0px",
    },
  },
  avatar: {
    width: 150,
    height: 150,
    fontSize: 60,
  },
  textSecondary: {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));
function HeaderProfile(props) {
  const { userName } = props;
  const classes = useStyles();
  return (
    <Container className={classes.background}>
      <Toolbar className={classes.toolbar}>
        <Box pr={3} py={3}>
          {/* ?. là cho việc load data lúc đầu null sau đó lại có data */}
          <Avatar className={classes.avatar} size={100}>
            {userName?.displayName[0]}
          </Avatar>
        </Box>
        <Box>
          <>
            <Typography variant="h4">{userName?.displayName}</Typography>

            <Typography className={classes.textSecondary}>
              Thành viên từ Ngày{""}
              {moment(new Date(userName?.metadata?.creationTime)).format(
                " DD MMMM, YYYY"
              )}
            </Typography>
          </>
        </Box>
      </Toolbar>
    </Container>
  );
}

export default HeaderProfile;
