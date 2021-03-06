import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "@emotion/styled";
import * as R from "ramda";

const ADD_EXPENSE = gql`
  mutation(
    $item: String!
    $value: Float!
    $currency: String!
    $sharedWith: [Int]
  ) {
    addExpense(
      item: $item
      value: $value
      currency: $currency
      sharedWith: $sharedWith
    ) {
      id
      item
      value
      sharedWith {
        id
        username
      }
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
      currency
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const ItemTextField = React.memo(({ item, changeHandler }) => {
  const handleChange = e => changeHandler(e.target.value);
  return (
    <TextField
      label="Item"
      margin="normal"
      variant="outlined"
      value={item}
      onChange={handleChange}
    />
  );
});

const CurrencySelector = React.memo(({ currency, changeHandler }) => {
  const handleChange = e => changeHandler(e.target.value);
  return (
    <Select value={currency} input={<OutlinedInput />} onChange={handleChange}>
      <MenuItem value={"RM"}>RM</MenuItem>
      <MenuItem value={"AUD"}>AUD</MenuItem>
    </Select>
  );
});

const ValueTextField = React.memo(({ value, changeHandler }) => {
  const handleChange = e => changeHandler(parseFloat(e.target.value));
  return (
    <TextField
      label="Value"
      type="number"
      margin="normal"
      variant="outlined"
      value={value}
      onChange={handleChange}
      fullWidth
    />
  );
});

const UsersCheckbox = React.memo(({ sharedWith, changeHandler }) => {
  const handleSharedWithChange = id => event => {
    let res;
    if (event.target.checked) {
      res = sharedWith.concat(id);
    } else {
      res = sharedWith.filter(x => x !== id);
    }
    changeHandler(res);
  };
  return (
    <Query
      query={gql`
        {
          users {
            id
            username
            purchaseFlightTicket
          }
        }
      `}
    >
      {({ data, client }) => {
        const { me } = client.readQuery({
          query: gql`
            {
              me {
                id
              }
            }
          `
        });
        const meUser = ({ id }) => id === me.id;
        const confirmedUsers = ({ purchaseFlightTicket }) =>
          purchaseFlightTicket === true;
        const getConfirmedUsersWithoutMe = R.pipe(
          R.filter(confirmedUsers),
          R.reject(meUser)
        );
        const usersWithoutMe = getConfirmedUsersWithoutMe(data.users);

        return (
          <FormGroup row>
            {usersWithoutMe.map(user => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={sharedWith.includes(parseInt(user.id))}
                    onChange={handleSharedWithChange(parseInt(user.id))}
                    value={user.id}
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
                label={user.username}
              />
            ))}
          </FormGroup>
        );
      }}
    </Query>
  );
});

const SubmitButton = React.memo(({ clickHandler, error, loading }) => {
  if (loading) return <CircularProgress />;
  return error ? (
    <p>Error</p>
  ) : (
    <Button variant="contained" color="primary" onClick={clickHandler}>
      Add Expense
    </Button>
  );
});

const ValueContainer = styled.div`
  display: flex;
  & > div {
    margin: 0;
  }
`;

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "30em",
    marginLeft: "auto !important",
    marginRight: "auto !important"
  }
});

const Add = () => {
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("RM");
  const [sharedWith, setSharedWith] = useState([]);

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ItemTextField item={item} changeHandler={setItem} />
        <ValueContainer>
          <CurrencySelector currency={currency} changeHandler={setCurrency} />
          <ValueTextField value={value} changeHandler={setValue} />
        </ValueContainer>
        <UsersCheckbox sharedWith={sharedWith} changeHandler={setSharedWith} />
        <Mutation
          mutation={ADD_EXPENSE}
          variables={{ item, value, currency, sharedWith }}
          refetchQueries={[
            {
              query: GET_EXPENSES
            }
          ]}
          update={(cache, { data: { addExpense } }) => {
            const { expenses } = cache.readQuery({
              query: GET_EXPENSES
            });
            expenses.unshift(addExpense);

            cache.writeQuery({
              query: GET_EXPENSES,
              data: { expenses }
            });
          }}
        >
          {(addExpense, { loading, error }) => (
            <SubmitButton
              clickHandler={addExpense}
              error={error}
              loading={loading}
            />
          )}
        </Mutation>
      </form>
    </Container>
  );
};

export const Form = ({
  children,
  curItem,
  curValue,
  curCurrency,
  curSharedWith
}) => {
  const [item, setItem] = useState(curItem || "");
  const [value, setValue] = useState(curValue || "");
  const [currency, setCurrency] = useState(curCurrency || "RM");
  const [sharedWith, setSharedWith] = useState(curSharedWith || []);

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ItemTextField item={item} changeHandler={setItem} />
        <ValueContainer>
          <CurrencySelector currency={currency} changeHandler={setCurrency} />
          <ValueTextField value={value} changeHandler={setValue} />
        </ValueContainer>
        <UsersCheckbox sharedWith={sharedWith} changeHandler={setSharedWith} />
        {children({ item, value, currency, sharedWith })}
      </form>
    </Container>
  );
};

export default Add;
