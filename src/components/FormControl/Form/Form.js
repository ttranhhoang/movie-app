import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));
const Form = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate {...props}>
      {children}
    </form>
  );
};
export default Form;
