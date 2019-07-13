import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Login from "./Login";
import Expense from "./Expense";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USERS = gql`
  {
    users {
      id
      username
    }
  }
`;

const Users = () => (
  <Query query={GET_USERS}>
    {({ data }) => {
      console.log("data", data);
      return <div>My Profile</div>;
    }}
  </Query>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Login />
        <Users />
        <Expense />
      </header>
    </div>
  );
}

export default App;
