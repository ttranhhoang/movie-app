import React from "react";
import PropTypes from "prop-types";
import Doughnut from "react-chartjs-2";
import { fade, makeStyles, Typography } from "@material-ui/core";
import { green, grey, yellow } from "@material-ui/core/colors";

ProgressCircle.propTypes = {
  value: PropTypes.number.isRequired,
};

ProgressCircle.defaultProps = {
  value: 0,
};
const useStyles = makeStyles((theme) => ({
  customDoughtNut: {
    position: "relative",
    borderRadius: "50%",
    backgroundColor: "#063440",
    color: theme.palette.getContrastText("#142851"),
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: (props) => ({
    position: "absolute",
    marginLeft: 2,
    "& > h6": {
      fontSize: props / 2.5,
      "& > span": {
        fontSize: props / 4,
        verticalAlign: "text-top",
      },
    },
  }),
}));
function ProgressCircle(props) {
  const { value, size } = props;
  const classes = useStyles(size);
  const data = {
    datasets: [
      {
        data: [value, 10 - value],
        backgroundColor: [
          value >= 7 ? green["A700"] : value >= 4 ? yellow["A700"] : grey[500],
          value >= 7
            ? fade(green["A700"], 0.3)
            : value >= 4
            ? fade(yellow["A700"], 0.3)
            : fade(grey[500], 0.5),
        ],
        pointHoverRadius: 5,
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className={classes.customDoughtNut}>
      <Doughnut
        data={data}
        width={size}
        height={size}
        options={{
          cutoutPercentage: 85,
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: false,
          },
          hover: {
            mode: null,
          },
          legend: {
            display: false,
          },
        }}
      />
      <div className={classes.absoluteCenter}>
        <Typography variant="subtitle2">
          {Math.round(value * 10)}
          <span>%</span>
        </Typography>
      </div>
    </div>
  );
}

export default ProgressCircle;
