import React from "react";
import PropTypes from "prop-types";
import {
  CardMedia,
  Typography,
  Toolbar,
  makeStyles,
  Container,
} from "@material-ui/core";
import Images from "assets/img";
CompanyHeader.propTypes = {
  companyHeader: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(7),
    },
  },
  cardMedia: {
    height: 50,
    width: "auto",
    borderRadius: 0,
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
      backgroundPosition: "center -150px",
    },
  },
}));
function CompanyHeader(props) {
  const { companyHeader } = props;
  const classes = useStyles();
  return (
    <Container className={classes.background}>
      <Toolbar className={classes.toolbar}>
        {companyHeader.logo_path ? (
          <CardMedia
            component="img"
            image={companyHeader.logo_path}
            alt={companyHeader.name}
            title={companyHeader.title}
            className={classes.cardMedia}
          />
        ) : (
          <Typography variant="h5">{companyHeader.name}</Typography>
        )}
        {/* Phải nhớ là bắt lỗi khi value underfine */}
        {companyHeader.movies && (
          <Typography variant="h6">
            {companyHeader.movies.total_results} movies
          </Typography>
        )}
      </Toolbar>
    </Container>
  );
}

export default CompanyHeader;
