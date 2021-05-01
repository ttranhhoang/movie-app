import React from "react";
import PropTypes from "prop-types";
import {
  CardMedia,
  CardActionArea,
  makeStyles,
  Tooltip,
  Typography,
  Fade,
  useMediaQuery,
  Divider,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import moment from "moment";
PersonInfo.propTypes = {
  personInfo: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "12%",
    marginBottom: "1.35em",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      margin: "auto",
    },
  },
  external_ids: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "& > a": {
      marginRight: theme.spacing(2),
    },
  },
  divider: {
    margin: theme.spacing(2),
  },
  typography: {
    fontWeight: "bold",
  },
}));
function PersonInfo(props) {
  const { personInfo } = props;
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      <div>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={personInfo.name}
            image={personInfo.profile_path}
            title={personInfo.name}
            className={classes.cardMedia}
          />
        </CardActionArea>
      </div>
      <div className={classes.external_ids}>
        {personInfo.external_ids.twitter_id && (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Visit Twitter"
          >
            <a
              href={personInfo.external_ids.twitter_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="large"></TwitterIcon>
            </a>
          </Tooltip>
        )}

        {personInfo.external_ids.instagram_id && (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Visit Instagram"
          >
            <a
              href={personInfo.external_ids.instagram_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="large"></InstagramIcon>
            </a>
          </Tooltip>
        )}

        {personInfo.external_ids.facebook_id && (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Visit Facebook"
          >
            <a
              href={personInfo.external_ids.facebook_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon fontSize="large"></FacebookIcon>
            </a>
          </Tooltip>
        )}
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          Thông tin cá nhân
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.typography}>
          Biết đến
        </Typography>
        <Typography gutterBottom>{personInfo.known_for_department}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.typography}>
          Giới tính
        </Typography>
        <Typography>{personInfo.gender}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.typography}>
          Ngày sinh
        </Typography>
        <Typography gutterBottom>
          {moment(new Date(personInfo.birthday)).format("DD, MMMM, YYYY")}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.typography}>
          Nơi sinh
        </Typography>
        <Typography gutterBottom>{personInfo.place_of_birth}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.typography}>
          Cũng được biết đến với tên
        </Typography>
        <div>
          {personInfo.also_known_as.map((personName, index) => (
            <Typography key={index} gutterBottom>
              {personName}
            </Typography>
          ))}
        </div>
      </div>
      {matches ? (
        <Divider variant="middle" className={classes.divider} />
      ) : null}
    </>
  );
}

export default PersonInfo;
