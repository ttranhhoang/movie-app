import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import RowTable from "../RowTable/RowTable";
Table.propTypes = {
  department: PropTypes.object,
  credits: PropTypes.object,
};
const useStyles = makeStyles({
  tableContainer: {
    marginBottom: "1.35em",
  },
  table: {
    minWidth: 650,
  },
});

function InfoTable(props) {
  const { department, credits } = props;
  console.log("TAble CRedits", credits);
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ textTransform: "capitalize" }}
      >
        {department}
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} size="small">
          <TableBody>
            {[...credits]
              .sort((a, b) =>
                // sắp xếp phim không có release_date trước
                !a.release_date
                  ? -1
                  : // sắp xếp theo năm ra mắt giảm dần
                    new Date(b.release_date) - new Date(a.release_date)
              )
              .map((credit, index) => (
                <RowTable key={index} row={credit} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default InfoTable;
