import { Button, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import original_languages from "ulti/OriginalLanguages/OriginalLanguages";
import {useHistory} from 'react-router-dom';
Facts.propTypes = {
  facts: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.2),
    },
  },
  facts: {
    "& > div": {
      marginBottom: theme.spacing(1),
    },
  },
  button: {
    textTransform: "none",
  },
  imgNetwork: {
    width: "70px",
  },
}));
function Facts(props) {
  const { facts } = props;
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.facts}>
      <div>
        <Typography variant="subtitle1">Status</Typography>
        <Typography variant="body2">{facts.status}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Original Language</Typography>
        <Typography variant="body2">
          {original_languages[facts.original_language].name}
        </Typography>
      </div>
      {!isNaN(facts.budget) && (
        <div>
          <Typography variant="subtitle1">Budget</Typography>
          <Typography variant="body2">
            {/* format number currency */}
            {facts.budget ? `$${facts.budget.toLocaleString("en-US")}` : "-"}
          </Typography>
        </div>
      )}
      {!isNaN(facts.revenue) && (
        <div>
          <Typography variant="subtitle1">Revenue</Typography>
          <Typography variant="body2">
            {/* format number currency */}
            {facts.revenue ? `$${facts.revenue.toLocaleString("en-US")}` : "-"}
          </Typography>
        </div>
      )}

      {facts.networks && (
        <>
          <div>
            <Typography variant="subtitle1">Network</Typography>
            {facts.networks.logo_path ? (
              <img
                src={facts.networks.logo_path}
                alt={facts.networks.name}
                title={facts.networks.name}
                className={classes.imgNetwork}
              />
            ) : (
              "-"
            )}
          </div>
          <div>
            <Typography variant="subtitle1">Type</Typography>
            <Typography variant="body2">{facts.type}</Typography>
          </div>
        </>
      )}
      <Typography variant="subtitle1">Từ khóa</Typography>
      <div className={classes.root}>
        {facts.keywords.length > 0 ? (
          facts.keywords.map((fact) => (
            <Button
              variant="contained"
              color="primary"
              key={fact.id}
              onClick={() => history.push(`/keywords/${fact.name}/${fact.id}`)}
              className={classes.button}
            >
              <Typography variant="body2">{fact.name}</Typography>
            </Button>
          ))
        ) : (
          <Typography>Không có từ khóa nào được thêm.</Typography>
        )}
      </div>
    </div>
  );
}

export default Facts;
