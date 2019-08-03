import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { mdiCloseCircle, mdiCheckCircle } from "@mdi/js";
import Card from "./hoc/Card";
import Button from "@material-ui/core/Button";
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

const UPDATE_FLIGHT_STATUS = gql`
  mutation($action: Boolean!) {
    setFlightTicketPurchaseStatus(action: $action) {
      username
      purchaseFlightTicket
    }
  }
`;

const IconStyled = styled(Icon)`
  vertical-align: middle;
`;

const UserItem = ({ username, isFlightTicketPurchased }) => (
  <TableRow>
    <TableCell>
      <Typography variant="body1">{username}</Typography>
    </TableCell>
    <TableCell align="center">
      {isFlightTicketPurchased ? (
        <IconStyled path={mdiCheckCircle} size={1} color="green" />
      ) : (
        <IconStyled path={mdiCloseCircle} size={1} color="red" />
      )}
    </TableCell>
  </TableRow>
);

const action = true;

const UpdateFlightStatus = (
  <Mutation
    mutation={UPDATE_FLIGHT_STATUS}
    variables={{ action }}
    refetchQueries={[
      {
        query: gql`
          query {
            users {
              id
              username
              purchaseFlightTicket
            }
          }
        `
      }
    ]}
  >
    {(setFlightTicketPurchaseStatus, { data, loading, error }) => (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={setFlightTicketPurchaseStatus}
        >
          Update flight status
        </Button>
        {error && <p>Error</p>}
      </>
    )}
  </Mutation>
);

const Users = () => (
  <Query query={GET_USERS}>
    {({ data, loading, error }) => (
      <Card
        title="Users"
        action={UpdateFlightStatus}
        render={() => (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">Flight ticket</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {!loading ? (
              data.users.map(user => (
                <React.Fragment key={user.id}>
                  <TableBody>
                    <UserItem
                      username={user.username}
                      isFlightTicketPurchased={user.purchaseFlightTicket}
                    />
                  </TableBody>
                </React.Fragment>
              ))
            ) : (
              <p>Loading ...</p>
            )}
          </Table>
        )}
      />
    )}
  </Query>
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const UserOverview = () => (
  <Query query={GET_USERS}>
    {({ data: { users } }) => {
      const isConfirmed = ({ purchaseFlightTicket }) =>
        purchaseFlightTicket === true;
      const confirmedUsers = R.pipe(
        R.filter(isConfirmed),
        R.length
      )(users);
      return (
        <Card
          title="User Overview"
          render={() => (
            <Grid>
              <Paper>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                >
                  <Typography variant="h6">Confirmed</Typography>
                  <Typography variant="body1">{confirmedUsers}</Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        />
      );
    }}
  </Query>
);

export default Users;

export { UserItem, UserOverview };
