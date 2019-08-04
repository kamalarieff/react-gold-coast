import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Header from "./Header";
import { ExpensePage } from "./components/Expense";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_LOGGED_IN_STATUS = gql`
  {
    isLoggedIn @client
  }
`;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Query query={GET_LOGGED_IN_STATUS}>
      {({ data: { isLoggedIn } }) => (
        <Route
          {...rest}
          render={props =>
            isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </Query>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/expenses" component={ExpensePage} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

const FetchQueries = () => (
  <Query
    fetchPolicy="network-only"
    query={gql`
      query {
        users {
          id
          username
        }
        expenses {
          id
          item
          value
          sharedWith {
            id
            username
          }
          currency
          createdAt
          user {
            id
            username
          }
        }
      }
    `}
  >
    {({ data, client }) => {
      client.writeQuery({
        query: gql`
          query {
            MyExpenses @client {
              id
              item
              value
              currency
              createdAt
              sharedWith {
                id
                username
              }
            }
          }
        `,
        data: {
          MyExpenses: data.expenses
        }
      });
      return <></>;
    }}
  </Query>
);

export default App;
