import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { DateTime } from "luxon";
import Card from "./hoc/Card";

const ADD_EXPENSE = gql`
  mutation($item: String!, $value: Float!, $currency: String!) {
    addExpense(item: $item, value: $value, currency: $currency) {
      id
      item
      value
      sharedWith
      currency
      createdAt
      user @client {
        id
        username
      }
    }
  }
`;

const GET_EXPENSES = gql`
  {
    expenses {
      id
      item
      value
      sharedWith
      currency
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const GET_MY_EXPENSES = gql`
  query {
    MyExpenses @client {
      id
      item
      value
      sharedWith
      currency
      createdAt
    }
  }
`;

const Expense = () => {
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("RM");

  return (
    <Mutation
      mutation={ADD_EXPENSE}
      variables={{ item, value, currency }}
      refetchQueries={[
        {
          query: GET_EXPENSES
        },
        {
          query: GET_MY_EXPENSES
        }
      ]}
      update={(cache, { data: { addExpense } }) => {
        const { expenses } = cache.readQuery({
          query: GET_EXPENSES
        });
        expenses.push(addExpense);

        cache.writeQuery({
          query: GET_EXPENSES,
          data: { expenses }
        });
      }}
    >
      {(addExpense, { loading, error }) => (
        <Container>
          <form noValidate autoComplete="off">
            <TextField
              label="Item"
              margin="normal"
              variant="outlined"
              value={item}
              onChange={e => setItem(e.target.value)}
            />
            <Select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              input={<OutlinedInput />}
            >
              <MenuItem value={"RM"}>RM</MenuItem>
              <MenuItem value={"AUD"}>AUD</MenuItem>
            </Select>
            <TextField
              label="Value"
              type="number"
              margin="normal"
              variant="outlined"
              value={value}
              onChange={e => setValue(parseFloat(e.target.value))}
            />
            <Button variant="contained" color="primary" onClick={addExpense}>
              Add Expense
            </Button>
          </form>
          {error && <p>Error</p>}
        </Container>
      )}
    </Mutation>
  );
};

export const ExpenseCard = () => (
  <Query query={GET_EXPENSES}>
    {({ data, loading, error }) => (
      <Card
        title="Expenses"
        render={() => (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Time</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">User</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Item</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Value</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {!loading ? (
              data.expenses.map(expense => (
                <React.Fragment key={expense.id}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">
                          {DateTime.fromISO(expense.createdAt).toFormat(
                            "dd LLL hh:mm a"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {expense.user.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{expense.item}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {expense.currency} {expense.value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </React.Fragment>
              ))
            ) : (
              <p>Loading ...</p>
            )}
          </Table>
        )}
      />
    )}
  </Query>
);

const useStyles = makeStyles({
  root: {
    maxWidth: "90em",
    margin: "0 auto",
    padding: "2em",
    "& > div": {
      margin: "2em 0"
    }
  }
});

const MyExpenses = () => (
  <Query query={GET_MY_EXPENSES} displayName="Singsing">
    {({ data, loading, error }) => {
      return error ? (
        <div>Error: {error}</div>
      ) : (
        <Card
          title="My Expenses"
          render={() => (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Time</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Item</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Value</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {!loading ? (
                data.MyExpenses.map(expense => (
                  <React.Fragment key={expense.id}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body1">
                            {DateTime.fromISO(expense.createdAt).toFormat(
                              "dd LLL hh:mm a"
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {expense.item}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {expense.currency} {expense.value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </React.Fragment>
                ))
              ) : (
                <p>Loading ...</p>
              )}
            </Table>
          )}
        />
      );
    }}
  </Query>
);

export const ExpensePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Expense />
      <MyExpenses />
      <ExpenseCard />
    </div>
  );
};

export default Expense;
