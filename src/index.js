import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
  headers: {
    "x-token": localStorage.getItem("token") || ""
  }
});

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: localStorage.getItem("token") ? true : false
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers: {
    Query: {
      users: (_root, variables, { cache, getCacheKey }) => {
        const temp = gql`
          {
            users {
              id
            }
          }
        `;
        // console.log("TCL: getCacheKey", getCacheKey);
        // console.log("TCL: cache", cache.readQuery({ query: temp }));
        // console.log("TCL: variables", variables);
        // console.log("TCL: _root", _root);
        // return null;
      },
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
