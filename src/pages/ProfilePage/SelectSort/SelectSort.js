import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
SelectSort.propTypes = {
  valueSort: PropTypes.string,
  handleChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  formControl: {
    paddingLeft: theme.spacing(2),
  },
}));
function SelectSort(props) {
  const { valueSort, handleChange } = props;
  const classes = useStyles();
  return (
    <Grid item xs={12} md="auto" className={classes.grid}>
      <Typography variant="subtitle1">Lọc theo:</Typography>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSort}
          onChange={handleChange}
        >
          <MenuItem value="date_added">Ngày thêm</MenuItem>
          <MenuItem value="popularity">Phổ biến</MenuItem>
          <MenuItem value="release_date">Ngày chiếu</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default SelectSort;
