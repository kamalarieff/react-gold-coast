import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { DateTime } from "luxon";
import Card from "../hoc/Card";
import ExpenseAdd from "./Add";

const GET_EXPENSES = gql`
  {
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
`;

const GET_MY_EXPENSES = gql`
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
`;

export const ExpenseCard = () => (
  <Query query={GET_EXPENSES}>
    {({ data, loading, error }) => (
      <Card
        overflow
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
                  <Typography variant="body1">Shared With</Typography>
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
                        {expense.sharedWith.map(user => (
                          <Typography key={user.id} variant="body1">
                            {user.username}
                          </Typography>
                        ))}
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
          overflow
          title="My Expenses"
          render={() => (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Time</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Shared With</Typography>
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
                          {expense.sharedWith.map(user => (
                            <Typography key={user.id} variant="body1">
                              {user.username}
                            </Typography>
                          ))}
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ExpensePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <The_query_call /> */}
      <ExpenseAdd />
      <MyExpenses />
      <ExpenseCard />
    </div>
  );
};
