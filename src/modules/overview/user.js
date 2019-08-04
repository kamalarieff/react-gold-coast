import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import * as R from "ramda";
import { StyledPaper } from "./index";

const GET_USERS = gql`
  {
    users {
      id
      username
      purchaseFlightTicket
    }
  }
`;

const Overview = () => (
  <Query query={GET_USERS}>
    {({ data: { users } }) => {
      console.log("TCL: users", users);
      const isConfirmed = ({ purchaseFlightTicket }) =>
        purchaseFlightTicket === true;
      const confirmedUsers = R.pipe(
        R.filter(isConfirmed),
        R.length
      )(users);
      return (
        <StyledPaper>
          <Typography variant="body1">Users Confirmed</Typography>
          <Typography variant="body2">{confirmedUsers}</Typography>
        </StyledPaper>
      );
    }}
  </Query>
);

export default Overview;
