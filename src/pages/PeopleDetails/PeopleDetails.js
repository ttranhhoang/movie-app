import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import request from "api/request";
import PersonInfo from "./PersonInfo/PersonInfo";
import Loading from "components/Loading/Loading";
import Images from "assets/img";
import {
  facebook_url,
  instagram_url,
  twitter_url,
} from "assets/external_ids/external_ids";
import Biography from "./Biography/Biography";
import KnowFor from "./KnowFor/KnowFor";
import { no_image } from "assets/no_image";
import TableCredits from "./TableCredits/TableCredits";
function PeopleDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const [peopleDetails, setPeopleDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const respone = await request.fetchPeople(id);
        const modifiedData = {
          ...respone,
          profile_path: respone.profile_path
            ? Images.baseurl_IMG + respone.profile_path
            : no_image,
          gender: respone.gender === 1 ? "Female" : "Male",
          external_ids: {
            twitter_id: respone.external_ids.twitter_id
              ? twitter_url + respone.external_ids.twitter_id
              : "",
            instagram_id: respone.external_ids.instagram_id
              ? instagram_url + respone.external_ids.instagram_id
              : "",
            facebook_id: respone.external_ids.facebook_id
              ? facebook_url + respone.external_ids.facebook_id
              : "",
          },
          movie_credits: {
            cast: respone.movie_credits.cast.map((person) => ({
              ...person,
              poster_path: person.poster_path
                ? Images.baseurl_IMG + person.poster_path
                : no_image,
            })),
            crew: respone.movie_credits.crew.map((person) => ({
              ...person,
              poster_path: person.poster_path
                ? Images.baseurl_IMG + person.poster_path
                : no_image,
            })),
          },
        };
        setPeopleDetails(modifiedData);
        console.log("PersonInfo", modifiedData);
        setLoading(false);
      } catch (error) {
        console.log("Lỗi PeopleDetails", error);
      }
    };
    fetchData();
  }, [id]);
  return loading ? (
    <Loading height="90vh" />
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <PersonInfo personInfo={peopleDetails} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Container>
            {" "}
            <Biography biography={peopleDetails} />
            <KnowFor knowFor={peopleDetails} />
            <TableCredits
              crew={peopleDetails.movie_credits.crew}
              cast={peopleDetails.movie_credits.cast}
            />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PeopleDetails;
