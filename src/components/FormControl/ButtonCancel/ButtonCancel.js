import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function ButtonCancel({ children, ...props }) {
  const history = useHistory();
  return (
    <Button color="primary" onClick={() => history.push("/")} {...props}>
      {children}
    </Button>
  );
}

export default ButtonCancel;
