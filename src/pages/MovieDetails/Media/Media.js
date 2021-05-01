import {
  Box,
  CardMedia,
  Divider,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

Media.propTypes = {
  media: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  tabs: {
    textTransform: "none",
    marginLeft: theme.spacing(1),
    "&.Mui-selected": {
      backgroundColor: "#fff!important",
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    height: 300,
    margin: theme.spacing(2, 0, 2, 0),
  },
  noBox: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  cardVideo: {
    width: 500,
    height: "100%",
  },
  cardMedia: {
    width: "auto",
    height: "100%",
    borderRadius: 0,
  },
}));

function Media(props) {
  const { media } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box display="flex" alignItems="center" mt={0.7}>
        <Typography variant="h6">Truyền thông</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab label="Video" className={classes.tabs} />
          <Tab label="Backdrop" className={classes.tabs} />
          <Tab label="Poster" className={classes.tabs} />
        </Tabs>
      </Box>
      {/* <Box display="flex" alignItems="center" height={300} mt={2} mb={2}> */}
      {value === 0 &&
        (media.videos.key ? (
          <Box className={classes.box}>
            <CardMedia
              component="iframe"
              src={media.videos.key}
              className={classes.cardVideo}
            ></CardMedia>
          </Box>
        ) : (
          <Box className={classes.noBox}>
            <Typography>Chưa có video</Typography>
          </Box>
        ))}
      {value === 1 &&
        (media.backdrop_path !== "" ? (
          <Box className={classes.box}>
            <CardMedia
              component="img"
              image={media.backdrop_path}
              title={media.title ? media.titile : media.name}
              alt={media.title ? media.titile : media.name}
              className={classes.cardMedia}
            ></CardMedia>
          </Box>
        ) : (
          <Box className={classes.noBox}>
            <Typography>Hiện tại chúng tôi chưa có hình ảnh</Typography>
          </Box>
        ))}
      {value === 2 &&
        (media.poster_path !== "" ? (
          <Box className={classes.box}>
            <CardMedia
              component="img"
              image={media.poster_path}
              title={media.title ? media.titile : media.name}
              alt={media.title ? media.titile : media.name}
              className={classes.cardMedia}
            ></CardMedia>
          </Box>
        ) : (
          <Box className={classes.noBox}>
            <Typography>Hiện tại chúng tôi chưa có hình ảnh</Typography>
          </Box>
        ))}
      {/* </Box> */}
      <Divider />
    </div>
  );
}

export default Media;
