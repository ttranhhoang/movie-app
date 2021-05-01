import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import sortByDepartment from "ulti/SortByDepartment/SortByDepartment";
import InfoTable from "./InfoTable/InfoTable";

TableCredits.propTypes = {
  cast: PropTypes.array,
  crew: PropTypes.array,
};
const useStyles = makeStyles((theme) => ({
  tableCredits: {
    marginTop: "1.35em",
    position: "relative",
  },
  formControl: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
function TableCredits(props) {
  const classes = useStyles();
  const { cast, crew } = props;
  const [value, setValue] = useState("all");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const modifiedCrew = sortByDepartment(crew);
  return (
    <div className={classes.tableCredits}>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          disableUnderline
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
        >
          <MenuItem value="all"> All ({cast.length + crew.length})</MenuItem>
          {cast.length > 0 && (
            <MenuItem value="acting">Acting ({cast.length})</MenuItem>
          )}
          {modifiedCrew.map((crew, index) => (
            <MenuItem key={index} value={crew.department}>
              {crew.department}({crew.data.length})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {value === "all" ? (
        <>
          {cast.length > 0 && <InfoTable department="Acting" credits={cast} />}
          {modifiedCrew.length > 0 &&
            modifiedCrew.map((crew) => (
              <InfoTable
                key={crew.department}
                department={crew.department}
                credits={crew.data}
              />
            ))}
        </>
      ) : value === "acting" ? (
        <InfoTable department="acting" credits={cast} />
      ) : (
        modifiedCrew
          .filter((crew) => crew.department === value)
          .map((crew) => (
            <InfoTable
              key={crew.department}
              department={crew.department}
              credits={crew.data}
            />
          ))
      )}
    </div>
  );
}

export default TableCredits;
