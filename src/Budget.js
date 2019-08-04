import React, { useContext } from "react";
import { Query } from "react-apollo";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as R from "ramda";
import Card from "./hoc/Card";
import { StaticDataContext } from "./context";
import { GET_USERS } from "./index";

const currencyExchange = 2.9;

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Item</TableCell>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableHead>
);

const TotalRow = ({ total }) => (
  <TableRow style={{ backgroundColor: "lightgrey" }}>
    <TableCell>Total</TableCell>
    <TableCell>RM {total}</TableCell>
  </TableRow>
);

const Budget = () => {
  const { store } = useContext(StaticDataContext);
  return (
    <Query query={GET_USERS}>
      {({ data: { users } }) => {
        const confirmedUsersCount = R.pipe(
          R.filter(({ purchaseFlightTicket }) => purchaseFlightTicket === true),
          R.length
        )(users);

        const convertToRM = R.when(
          R.pathEq(["data", "currency"], "AUD"),
          R.evolve({
            data: {
              value: R.multiply(currencyExchange),
              currency: R.replace("AUD", "RM")
            }
          })
        );

        const dividePerPerson = R.when(
          R.propSatisfies(
            name =>
              name == "accommodation" || name == "fuel" || name == "car rental",
            "name"
          ),
          R.evolve({
            data: {
              value: R.divide(R.__, confirmedUsersCount)
            }
          })
        );

        const budget = R.map(
          R.pipe(
            convertToRM,
            dividePerPerson
          )
        )(store);

        const total = R.pipe(
          R.map(R.path(["data", "value"])),
          R.sum
        )(budget);

        return (
          <Card
            title="Budget"
            render={() => (
              <Table>
                <TableHeader />
                <TableBody>
                  {budget.map(({ name, data: { value } }) => (
                    <TableRow key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>RM {value}</TableCell>
                    </TableRow>
                  ))}
                  <TotalRow total={total} />
                </TableBody>
              </Table>
            )}
          />
        );
      }}
    </Query>
  );
};

export default Budget;
