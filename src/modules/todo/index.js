import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_TODOS } from "../../index";
import Page from "./page";

export default () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading Todos...</p>;
  if (error) return <p>Error loading Todos...</p>;
  console.log("TCL: data", data);

  return <p>Todos</p>;
};

export { Page };
