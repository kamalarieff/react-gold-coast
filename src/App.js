import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { ExpensePage } from "./Expense";

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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/expenses" component={ExpensePage} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
