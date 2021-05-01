import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  GridList,
  GridListTile,
  CardActionArea,
  CardMedia,
  Box,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import EventNoteIcon from "@material-ui/icons/EventNote";
Recomments.propTypes = {
  recommendations: PropTypes.array,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  typography: {
    marginTop: "0.35em",
  },
  girdList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    marginBottom: "0 !important",
  },
  cardAction: {
    position: "relative",
    "&:hover > div": {
      display: "inline",
    },
  },
  cardMedia: {
    height: "220px",
  },
  moment: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: theme.spacing(1),
    color: "#111",

    display: "none",
    position: "absolute",
    bottom: 0,
  },
  calendar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    marginRight: theme.spacing(0.5),
  },
}));
function Recomments(props) {
  const { recommendations, type } = props;
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Typography variant="h6" gutterBottom className={classes.typography}>
        Đề Xuất
      </Typography>
      {recommendations.length > 0 ? (
        <div className={classes.root}>
          <GridList
            className={classes.girdList}
            cellHeight="auto"
            spacing={8}
            cols={matches ? 2 : 5.5}
          >
            {recommendations.slice(0, 15).map((recomment) => (
              <GridListTile key={recomment.id}>
                <CardActionArea
                  component={Link}
                  to={`/${type}/${
                    recomment.title ? recomment.title : recomment.name
                  }/${recomment.id}`}
                  className={classes.cardAction}
                >
                  <CardMedia
                    component="img"
                    alt={recomment.title}
                    image={recomment.poster_path}
                    title={recomment.title}
                    className={classes.cardMedia}
                  />
                  <div className={classes.moment}>
                    <Typography component="p" className={classes.calendar}>
                      <EventNoteIcon
                        fontSize="small"
                        className={classes.icons}
                      />
                      {recomment.release_date
                        ? moment(new Date(recomment.release_date)).format(
                            "YYYY-MM-DD "
                          )
                        : moment(new Date(recomment.first_air_date)).format(
                            "YYYY-MM-DD "
                          )}
                    </Typography>
                    {/* <Typography>{recomment.vote_average * 10}%</Typography> */}
                  </div>
                </CardActionArea>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <Typography
                    component={Link}
                    to={`/${type}/${
                      recomment.title ? recomment.title : recomment.name
                    }/${recomment.id}`}
                  >
                    {recomment.title ? recomment.title : recomment.name}
                  </Typography>
                  {/* <Typography>{recomment.vote_average * 10}%</Typography> */}
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        <Typography>
          Chúng tôi hiện chưa có những đề xuất liên quan đến bộ phim.
        </Typography>
      )}
    </div>
  );
}

export default Recomments;
