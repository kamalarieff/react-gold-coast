import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USERS = gql`
  {
    users {
      id
      username
      purchaseFlightTicket
    }
  }
`;

const Users = () => (
  <Query query={GET_USERS}>
    {({ data, loading, error }) => (
      <>
        {!loading &&
          data.users.map(user => <span key={user.id}>{user.username}</span>)}
      </>
    )}
  </Query>
);

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Users />
      </header>
    </div>
  );
}

export default Home;
