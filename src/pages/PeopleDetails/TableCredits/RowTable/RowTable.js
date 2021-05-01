import {
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Box,
  makeStyles,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarRateIcon from "@material-ui/icons/StarRate";
import React, { useState } from "react";
import { Link } from "react-router-dom";
RowTable.propTypes = {
  row: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  cellTitle: {
    width: "90%",
  },
  cellDate: {
    padding: theme.spacing(1, 2),
  },
  cellIcon: {
    padding: "6px 0",
    textAlign: "center",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  cardMedia: {
    height: 150,
    width: 100,
    borderRadius: 0,
  },
  content: {
    width: 400,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    alignSelf: "flex-start",
    marginLeft: theme.spacing(2),
  },
  icon: {
    marginLeft: theme.spacing(1),
    padding: "3px 10px",
    backgroundColor: "#142851",
    borderRadius: 15,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    fontSize: 15,
  },
}));
function RowTable(props) {
  const { row } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="center" className={classes.cellDate}>
          {row.release_date ? new Date(row.release_date).getFullYear() : "—"}
        </TableCell>
        <TableCell align="left" className={classes.cellIcon}>
          <IconButton size="small" aria-describedby={id} onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        </TableCell>

        <TableCell align="left" className={classes.cellTitle}>
          <Typography
            component={Link}
            to={`/movie/${row.title}/${row.id}`}
            variant="subtitle2"
          >
            {row.title}
          </Typography>
          {row.character && (
            <Typography variant="body2" color="textSecondary" component="span">
              {" "}
              as {row.character}
            </Typography>
          )}
          {row.job && (
            <Typography variant="body2" color="textSecondary" component="span">
              {""}...{row.job}
            </Typography>
          )}
        </TableCell>
      </TableRow>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Card className={classes.card}>
          <CardActionArea
            component={Link}
            to={`/movie/${row.title}/${row.id}`}
            className={classes.cardMedia}
          >
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={row.poster_path}
              title={row.title}
            />
          </CardActionArea>
          <Box className={classes.content}>
            <Box display="flex" alignItems="baseline">
              <Typography
                component={Link}
                to={`/movie/${row.title}/${row.id}`}
                variant="h6"
                noWrap
                gutterBottom
              >
                {row.title}
              </Typography>
              <span className={classes.icon}>
                <StarRateIcon fontSize="small" />
                {/* The toFixed() method rounds a number to a given number of digits.  */}
                {row.vote_average.toFixed(1)}
              </span>
            </Box>
            <Typography>{row.overview}</Typography>
          </Box>
        </Card>
      </Popover>
    </>
  );
}

export default RowTable;
