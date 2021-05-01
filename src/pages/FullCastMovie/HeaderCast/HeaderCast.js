import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  CardMedia,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { blueGrey } from "@material-ui/core/colors";
import moment from "moment";
import { Link } from "react-router-dom";
HeaderCast.propTypes = {
  fullCast: PropTypes.object,
  type: PropTypes.string,
  movie: PropTypes.string,
  id: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  headerCast: {
    maxWidth: "none",
    backgroundColor: blueGrey[700],
    color: theme.palette.getContrastText(blueGrey[700]),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(4),
    },
  },
  toolbar: {
    paddingTop: theme.spacing(5),
  },
  cardMedia: {
    height: 90,
    width: 60,
    borderRadius: 0,
  },
  span: {
    marginLeft: theme.spacing(1),
    opacity: 0.6,
    fontSize: "1.75rem",
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
}));
function HeaderCast(props) {
  const { fullCast, type, movie, id } = props;
  console.log("HeaderCast", fullCast);
  const classes = useStyles();
  return (
    <Container className={classes.headerCast}>
      <Toolbar className={classes.toolbar}>
        <CardMedia
          component="img"
          image={fullCast.poster_path}
          title={fullCast.title ? fullCast.title : fullCast.name}
          alt={fullCast.title ? fullCast.title : fullCast.name}
          className={classes.cardMedia}
        ></CardMedia>
        <Box ml={2}>
          <Typography variant="h4">
            {fullCast.title ? fullCast.title : fullCast.name}
            <Typography component="span" className={classes.span}>
              (
              {fullCast.release_date
                ? moment(new Date(fullCast.release_date)).format("YYYY")
                : moment(new Date(fullCast.first_air_date)).format("YYYY")}
              )
            </Typography>
          </Typography>
          <Typography
            component={Link}
            to={`/${type}/${movie}/${id}`}
            className={classes.icon}
          >
            <ArrowBackIcon fontSize="small" />
            Back to main
          </Typography>
        </Box>
      </Toolbar>
    </Container>
  );
}

export default HeaderCast;
