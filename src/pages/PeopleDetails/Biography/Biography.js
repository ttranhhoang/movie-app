import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Button, makeStyles } from "@material-ui/core";

Biography.propTypes = {
  biography: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > button": {
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
}));
function Biography(props) {
  const { biography } = props;
  const classes = useStyles();
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div>
        <Typography variant="h4" gutterBottom>
          {biography.name}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          Tiểu Sử
        </Typography>
        {biography.biography ? (
          <Typography variant="body1" gutterBottom>
            {readMore
              ? biography.biography
              : `${biography.biography.substring(0, 700)}...`}
            <span className={classes.button}>
              {" "}
              <Button onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read Less" : "Read More"}
              </Button>
            </span>
          </Typography>
        ) : (
          <Typography gutterBottom>
            Chúng tôi chưa có tiểu sử của {biography.name}
          </Typography>
        )}
      </div>
    </>
  );
}

export default Biography;
