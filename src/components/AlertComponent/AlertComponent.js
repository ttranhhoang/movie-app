import React from "react";
import PropTypes from "prop-types";
import { IconButton, Zoom } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
AlertComponent.propTypes = {
  alertTitle: PropTypes.string,
  openn: PropTypes.bool,
  setOpenn: PropTypes.func,
  className: PropTypes.string,
};

function AlertComponent({ alertTitle, openn, setOpenn, className, ...props }) {
  return (
    <Zoom in={openn}>
      <Alert
        variant="filled"
        className={className}
        {...props}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenn(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertTitle}
      </Alert>
    </Zoom>
  );
}

export default AlertComponent;
