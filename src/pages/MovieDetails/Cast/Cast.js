import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  GridList,
  GridListTile,
  CardActionArea,
  CardMedia,
  Card,
  Divider,
  Box,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Images from "assets/img";
import { no_image } from "assets/no_image";
import { Link } from "react-router-dom";
Cast.propTypes = {
  credits: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  girdList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    marginBottom: "0 !important",
  },
  card: {
    height: "100%",
  },
  cardMedia: {
    height: "200px",
    borderRadius: theme.spacing(1, 1, 0, 0),
  },
  viewMore: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  fullcast: {
    padding: theme.spacing(1),
  },
}));
function Cast(props) {
  const { credits, type, name, id } = props;
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Diễn viên
      </Typography>
      <div className={classes.root}>
        <GridList
          className={classes.girdList}
          cellHeight="auto"
          spacing={8}
          cols={matches ? 2.5 : 5.5}
        >
          {credits.cast.length > 0 &&
            credits.cast.slice(0, 9).map((cast) => (
              <GridListTile key={cast.cast_id ? cast.cast_id : cast.id}>
                <Card className={classes.card}>
                  <CardActionArea
                    component={Link}
                    to={`/person/${cast.name}/${cast.id}`}
                    className={classes.cardAction}
                  >
                    <CardMedia
                      component="img"
                      alt={cast.name}
                      image={`${
                        cast.profile_path
                          ? `${Images.baseurl_IMG}${cast.profile_path}`
                          : `${no_image}`
                      }`}
                      title={cast.name}
                      className={classes.cardMedia}
                    />
                  </CardActionArea>
                  <Box m={1}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/person/${cast.name}/${cast.id}`}
                    >
                      {cast.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {cast.character}
                    </Typography>
                  </Box>
                </Card>
              </GridListTile>
            ))}
          {credits.cast.length >= 9 && (
            <GridListTile className={classes.viewMore}>
              <Link to={`/cast/${type}/${name}/${id}`}>
                Xem thêm
                <ArrowForwardIcon />
              </Link>
            </GridListTile>
          )}
        </GridList>
      </div>
      <div className={classes.fullcast}>
        <Typography variant="h6">
          <Link to={`/cast/${type}/${name}/${id}`}>Toàn bộ diễn viên & Đoàn phim</Link>
        </Typography>
      </div>
      <Divider />
    </>
  );
}

export default Cast;
