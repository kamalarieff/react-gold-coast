import React from "react";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const item = "jonathan";
const value = 20.0;

const ADD_EXPENSE = gql`
  mutation($item: String!, $value: Float!) {
    addExpense(item: $item, value: $value) {
      id
      item
      value
    }
  }
`;

const Expense = () => {
  return (
    <Mutation mutation={ADD_EXPENSE} variables={{ item, value }}>
      {(addExpense, { data, loading, error }) => (
        <>
          <Button variant="contained" color="primary" onClick={addExpense}>
            Add Expense
          </Button>
          {error && <p>Error</p>}
        </>
      )}
    </Mutation>
  );
};

export default Expense;
