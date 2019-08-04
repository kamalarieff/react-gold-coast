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
import * as R from "ramda";
import Card from "../hoc/Card";
import ExpenseAdd from "./Add";
import ExpenseUpdate, { UpdateProvider, UpdateButton } from "./Update";

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

export const ExpenseCard = () => (
  <Query query={GET_EXPENSES}>
    {({ data, loading, error, refetch }) => {
      const byId = R.descend(R.prop("id"));
      const expenses = R.sort(byId, data.expenses);
      return (
        <Card
          overflow="true"
          title="Expenses"
          action={<button onClick={() => refetch()}>Refetch</button>}
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
                expenses.map(expense => (
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
  <Query query={GET_EXPENSES} displayName="MyExpenses">
    {({ data: { expenses }, loading, error, refetch, client }) => {
      const { me } = client.readQuery({
        query: gql`
          {
            me {
              id
            }
          }
        `
      });
      const meUser = R.pathEq(["user", "id"], me.id);
      const byId = R.descend(R.prop("id"));
      const getMyExpenses = R.pipe(
        R.filter(meUser),
        R.sort(byId)
      );
      const myExpenses = getMyExpenses(expenses);
      return error ? (
        <div>Error: {error}</div>
      ) : (
        <Card
          overflow="true"
          title="My Expenses"
          action={<button onClick={() => refetch()}>Refetch</button>}
          render={() => (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
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
                myExpenses.map(expense => (
                  <React.Fragment key={expense.id}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <UpdateButton
                            id={expense.id}
                            formValues={{
                              item: expense.item,
                              value: expense.value,
                              currency: expense.currency,
                              sharedWith: expense.sharedWith.map(user =>
                                parseInt(user.id)
                              )
                            }}
                          />
                        </TableCell>
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
    <UpdateProvider>
      <div className={classes.root}>
        <ExpenseUpdate />
        <ExpenseAdd />
        <MyExpenses />
        <ExpenseCard />
      </div>
    </UpdateProvider>
  );
};
