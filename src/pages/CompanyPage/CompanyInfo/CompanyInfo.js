import React from "react";
import PropTypes from "prop-types";
import { Toolbar, makeStyles, Typography } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PublicIcon from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";
CompanyInfo.propTypes = {
  companyInfo: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  toolbar: {
    "& > div": {
      display: "flex",
      alignItems: "center",
      "& > p": {
        marginLeft: 4,
      },
    },
  },
}));
function CompanyInfo(props) {
  const classes = useStyles();
  const { companyInfo } = props;
  return (
    <div className={classes.background}>
      <Toolbar className={classes.toolbar} variant="dense">
        {companyInfo.name && (
          <div>
            <AssignmentIndIcon fontSize="small" />
            <Typography>{companyInfo.name}</Typography>
          </div>
        )}
        {companyInfo.headquarters && (
          <div>
            <LocationOnIcon fontSize="small" />
            <Typography>{companyInfo.headquarters}</Typography>
          </div>
        )}
        {companyInfo.origin_country && (
          <div>
            <PublicIcon fontSize="small" />
            <Typography>{companyInfo.origin_country}</Typography>
          </div>
        )}
        {companyInfo.homepage && (
          <div>
            <LinkIcon fontSize="small" />
            <Typography
              component={"a"}
              href={companyInfo.homepage}
              target="_blank"
            >
              Home Page
            </Typography>
          </div>
        )}
      </Toolbar>
    </div>
  );
}

export default CompanyInfo;
