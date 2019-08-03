import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { mdiCloseCircle, mdiCheckCircle } from "@mdi/js";
import Card from "./hoc/Card";
import Button from "@material-ui/core/Button";

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

export default Users;

export { UserItem };
