import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import gql from "graphql-tag";

const httpLink = new createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://graphql-goldcoast.herokuapp.com/graphql"
      : "http://localhost:8000/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token || ""
    }
  };
});

const cache = new InMemoryCache();
const persistor = new CachePersistor({
  cache,
  storage: window.sessionStorage,
  debug: true
});

// cache.writeData({
//   data: {
//     isLoggedIn: localStorage.getItem("token") ? true : false
//   }
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
    Mutation: {
      addExpense: (_root, _, { cache }) => {
        const { me } = cache.readQuery({
          query: gql`
            {
              me {
                id
                username
              }
            }
          `
        });
        return { user: me };
      }
    },
    Query: {
      isLoggedIn: (_root, variables, { cache, getCacheKey }) => {
        console.log("TCL: getCacheKey", getCacheKey);
        console.log("TCL: cache", cache);
        console.log("TCL: variables", variables);
        console.log("TCL: _root", _root);
        return null;
      }
    }
  }
});

client.query({
  query: gql`
    {
      users {
        id
        username
        purchaseFlightTicket
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
        updatedAt
        user {
          id
          username
        }
      }
    }
  `,
  fetchPolicy: "network-only"
});

// persistCache({
//   cache,
//   storage: window.localStorage,
//   debug: true
// }).then(() => {
//   ReactDOM.render(
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>,
//     document.getElementById("root")
//   );
// });

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restored: false
    };
  }

  componentDidMount() {
    persistor.restore().then(() => this.setState({ restored: true }));
  }

  render() {
    let content = null;
    if (!this.state.restored) {
      content = <div>Loading!!!</div>;
    } else {
      content = (
        <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
      );
    }

    return content;
  }
}
ReactDOM.render(
  <Root>
    <App />
  </Root>,
  // <ApolloProvider client={client}>
  //   <App />
  // </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
