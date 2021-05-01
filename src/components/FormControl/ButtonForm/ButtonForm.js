import React from "react";
import { Button } from "@material-ui/core";

const ButtonForm = ({ children, ...props }) => {
  return (
    <Button type="submit" variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
};

export default ButtonForm;
