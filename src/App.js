import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

import { ApolloConsumer } from "react-apollo";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log("rest", rest);
  return (
    <ApolloConsumer>
      {client => {
        console.log("client", client);
        return (
          <Route
            {...rest}
            render={props => {
              console.log("props", props);
              return <Component {...props} />;
            }}
          />
        );
      }}
    </ApolloConsumer>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
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
  );
}

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
              <Link to="/protected">Protected</Link>
            </li>
          </ul>
        </nav>
        <ProtectedRoute path="/" component={Home} />
        <Route path="/login" component={Login} />
        {/* <PrivateRoute path="/protected" component={Home} /> */}
      </div>
    </Router>
  );
}

export default App;
