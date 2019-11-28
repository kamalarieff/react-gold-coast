import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_MY_TODOS } from "../../index";
import Page from "./page";
import Box from "@material-ui/core/Box";
import { Typography, List } from "@material-ui/core";
import * as R from "ramda";
import { KnownArgumentNamesRule } from "graphql";

export default () => {
  // const {
  //   loading,
  //   error,
  //   data: { myTodos }
  // } = useQuery(GET_MY_TODOS);
  // if (loading) return <p>Loading Todos...</p>;
  // if (error) return <p>Error loading Todos...</p>;
  // const transformationArray = [
  //   {
  //     originalStatus: "IN_PROGRESS",
  //     text: "In Progress"
  //   },
  //   {
  //     originalStatus: "DONE",
  //     text: "Done"
  //   }
  // ];

  // const findStatus = R.find(R.propEq(originalStatus, "IN_PROGRESS"));

  // const kamal = R.map(console.log);

  // kamal(transformationArray);

  // const res = myTodos.map(x => {
  //   const { text } = transformationArray.find(
  //     y => x.status == y.originalStatus
  //   );
  //   return text;
  // });
  // console.log("TCL: res", res);

  return (
    <Box>
      <Typography variant="h6">My Todos</Typography>
      {/* {myTodos.map(todo => (
        <Typography variant="body1">
          {todo.todo.item}: {todo.status}
        </Typography>
      ))} */}
    </Box>
  );
};

export { Page };
