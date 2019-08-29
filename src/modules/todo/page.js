import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { GET_TODOS } from "../../index";
import Card from "../../hoc/Card";

const ADD_TODO = gql`
  mutation($item: String!) {
    addTodo(item: $item) {
      id
      item
      additionalDetails
    }
  }
`;

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "1em"
    }
  }
});

const AddButton = () => {
  //   const [addTodo] = useMutation(ADD_TODO, {
  //     update(
  //       cache,
  //       {
  //         data: { addTodo }
  //       }
  //     ) {
  //       const { todos } = cache.readQuery({ query: GET_TODOS });
  //       console.log("TCL: update -> todos", todos);
  //       console.log("TCL: AddButton -> addTodo", addTodo);
  //     }
  //   });
  const [addTodo, { data }] = useMutation(ADD_TODO, {
    refetchQueries: [
      {
        query: GET_TODOS
      }
    ]
  });
  const [item, setItem] = useState("");
  const classes = useStyles();
  return (
    <Box className={classes.root} display="flex" alignItems="center">
      <TextField
        label="Item"
        margin="normal"
        variant="outlined"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <Button
        disabled={item === ""}
        variant="contained"
        color="primary"
        onClick={() => addTodo({ variables: { item } })}
      >
        Add Todo
      </Button>
    </Box>
  );
};

export default () => {
  return (
    <Card
      action={<AddButton />}
      render={() => {
        const {
          loading,
          error,
          data: { todos }
        } = useQuery(GET_TODOS);
        if (loading) return <p>Loading Todos...</p>;
        if (error) return <p>Error loading Todos...</p>;
        return (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.item}</li>
            ))}
          </ul>
        );
      }}
    />
  );
};
