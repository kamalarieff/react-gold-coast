import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as R from "ramda";
import styled from "@emotion/styled";

const budget = [
  {
    name: "food",
    value: 150,
    currency: "AUD"
  },
  {
    name: "visa",
    value: 57,
    currency: "RM"
  },
  {
    name: "dream world",
    value: 160,
    currency: "RM"
  },
  {
    name: "movie world + paradise country",
    value: 186,
    currency: "RM"
  },
  {
    name: "flight ticket",
    value: 1343,
    currency: "RM"
  },
  {
    name: "airbnb",
    value: 467.63,
    currency: "RM"
  },
  {
    name: "car rental",
    value: 115.48,
    currency: "RM"
  },
  {
    name: "fuel",
    value: 72.23,
    currency: "RM"
  }
];

const currencyExchange = 2.9;

const transformations = {
  name: R.identity,
  value: R.multiply(currencyExchange),
  currency: R.replace("AUD", "RM")
};

const covertToRM = R.map(
  R.when(
    R.propSatisfies(x => x === "AUD", "currency"),
    R.evolve(transformations)
  )
);

const calculateTotal = R.pipe(
  R.map(R.prop("value")),
  R.sum
);

const budgetInRM = covertToRM(budget);

const BudgetCard = styled(Card)`
  height: fit-content;
`;

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Item</TableCell>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableHead>
);

const TotalRow = () => (
  <TableRow style={{ backgroundColor: "lightgrey" }}>
    <TableCell>Total</TableCell>
    <TableCell>RM {calculateTotal(budgetInRM)}</TableCell>
  </TableRow>
);

const Budget = () => (
  <BudgetCard>
    <CardHeader title={<Typography variant="h5">Budget</Typography>} />
    <CardContent>
      <Table>
        <TableHeader />
        <TableBody>
          {R.map(x => (
            <TableRow key={x.name}>
              <TableCell>{x.name}</TableCell>
              <TableCell>RM {x.value}</TableCell>
            </TableRow>
          ))(budgetInRM)}
          <TotalRow />
        </TableBody>
      </Table>
    </CardContent>
  </BudgetCard>
);

export default Budget;
