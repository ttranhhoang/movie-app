import React from "react";
import PropTypes from "prop-types";
import { Grid, Container, Typography } from "@material-ui/core";
import CardPerson from "../CardPerson/CardPerson";
MovieCredits.propTypes = {
  personCast: PropTypes.array,
  personCrew: PropTypes.array,
};

function MovieCredits(props) {
  const { personCast, personCrew } = props;
  console.log("PersonCast", personCast);
  console.log("PersonCrew", personCrew);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          {personCast.length > 0 &&
            personCast.map((cast, index) => (
              <CardPerson key={index} personCast={cast} />
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Crew
          </Typography>
          {personCrew.length > 0 &&
            personCrew.map((crew) => (
              <React.Fragment key={crew.department}>
                <Typography variant="subtitle1">{crew.department}</Typography>
                {crew.data.map((person, index) => (
                  <CardPerson key={index} personCast={person} />
                ))}
              </React.Fragment>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MovieCredits;
