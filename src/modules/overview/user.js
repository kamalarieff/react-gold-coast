import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import * as R from "ramda";

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
      const isConfirmed = ({ purchaseFlightTicket }) =>
        purchaseFlightTicket === true;
      const confirmedUsers = R.pipe(
        R.filter(isConfirmed),
        R.length
      )(users);
      return (
        <Paper>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
          >
            <Typography variant="body1">Users Confirmed</Typography>
            <Typography variant="body2">{confirmedUsers}</Typography>
          </Box>
        </Paper>
      );
    }}
  </Query>
);

export default Overview;
