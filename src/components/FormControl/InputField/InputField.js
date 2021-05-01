import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

const InputField = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      size="small"
      inputRef={ref}
      {...props}
    />
  );
});

export default InputField;
