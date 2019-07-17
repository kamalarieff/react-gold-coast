import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "@emotion/styled";

import Icon from "@mdi/react";
import { mdiCloseCircle, mdiCheckCircle } from "@mdi/js";

const GET_USERS = gql`
  {
    users {
      id
      username
      purchaseFlightTicket
    }
  }
`;

const IconStyled = styled(Icon)`
  vertical-align: middle;
`;

const UserCard = styled(Card)`
  height: fit-content;
`;

const UserHeader = () => (
  <ListItem>
    <ListItemText primary={<Typography variant="body1">Name</Typography>} />
    <ListItemText
      primary={<Typography variant="body1">Flight ticket</Typography>}
    />
  </ListItem>
);

const UserItem = ({ username, isFlightTicketPurchased }) => (
  <ListItem>
    <ListItemText primary={username} />
    <ListItemText
      primary={
        isFlightTicketPurchased ? (
          <IconStyled path={mdiCheckCircle} size={1} color="green" />
        ) : (
          <IconStyled path={mdiCloseCircle} size={1} color="red" />
        )
      }
    />
  </ListItem>
);

const Users = () => (
  <Query query={GET_USERS}>
    {({ data, loading, error }) => (
      <UserCard>
        <CardHeader title={<Typography variant="h5">People</Typography>} />
        <CardContent>
          <List>
            <UserHeader />
            {!loading ? (
              data.users.map(user => (
                <UserItem
                  key={user.id}
                  username={user.username}
                  isFlightTicketPurchased={user.purchaseFlightTicket}
                />
              ))
            ) : (
              <p>Loading ...</p>
            )}
          </List>
        </CardContent>
      </UserCard>
    )}
  </Query>
);

export default Users;

export { UserItem };
