import React, { useState, useContext, createContext } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@mdi/react";
import { mdiPencil, mdiClose } from "@mdi/js";
import { Form } from "./Add";

export const UpdateContext = createContext();

export const UpdateProvider = props => {
  const [open, openModal, closeModal] = useModal();
  const [id, setId] = useState(0);
  const [formValues, setFormValues] = useState({});
  return (
    <UpdateContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        id,
        setId,
        formValues,
        setFormValues
      }}
    >
      {props.children}
    </UpdateContext.Provider>
  );
};

const useModal = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return [open, openModal, closeModal];
};

export const UpdateButton = ({ id, formValues }) => {
  const { openModal, setId, setFormValues } = useContext(UpdateContext);
  const handleClick = () => {
    setId(id);
    setFormValues(formValues);
    openModal();
  };

  return (
    <Fab onClick={handleClick} size="small">
      <Icon path={mdiPencil} size={0.75} />
    </Fab>
  );
};

const UPDATE_EXPENSE = gql`
  mutation(
    $id: ID!
    $item: String!
    $value: Float!
    $currency: String!
    $sharedWith: [Int]
  ) {
    updateExpense(
      id: $id
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

const GET_MY_EXPENSES = gql`
  query {
    MyExpenses @client {
      id
      item
      value
      currency
      createdAt
    }
  }
`;

const SubmitButton = React.memo(({ item, value, currency, sharedWith }) => {
  const { id, closeModal } = useContext(UpdateContext);
  return (
    <Mutation
      mutation={UPDATE_EXPENSE}
      variables={{ id, item, value, currency, sharedWith }}
      refetchQueries={[
        {
          query: GET_EXPENSES
        },
        {
          query: GET_MY_EXPENSES
        }
      ]}
      update={(cache, { data: { updateExpense } }) => {
        const { expenses } = cache.readQuery({
          query: GET_EXPENSES
        });
        const newExpenses = expenses.filter(
          expense => expense.id !== updateExpense.id
        );
        newExpenses.unshift(updateExpense);

        cache.writeQuery({
          query: GET_EXPENSES,
          data: { newExpenses }
        });
      }}
    >
      {(updateExpense, { loading, error }) => {
        if (loading) return <CircularProgress />;
        if (error) return <p>Failed to update ...</p>;

        const handleClick = () => {
          updateExpense();
          closeModal();
        };

        return (
          <Button variant="contained" color="primary" onClick={handleClick}>
            Update expense
          </Button>
        );
      }}
    </Mutation>
  );
});

const useStyles = makeStyles({
  appBar: {
    position: "relative"
  }
});

const Update = () => {
  //   const { open, openModal, closeModal } = useModal();
  const { open, closeModal, formValues } = useContext(UpdateContext);
  const classes = useStyles();

  const {
    item: curItem,
    value: curValue,
    currency: curCurrency,
    sharedWith: curSharedWith
  } = formValues;

  return (
    <Dialog fullScreen onClose={closeModal} open={open}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
          >
            <Icon path={mdiClose} size={1} color="white" />
          </IconButton>
          <Typography variant="h6">Update</Typography>
        </Toolbar>
      </AppBar>
      <Form
        curItem={curItem}
        curValue={curValue}
        curCurrency={curCurrency}
        curSharedWith={curSharedWith}
      >
        {({ ...props }) => <SubmitButton {...props} />}
      </Form>
    </Dialog>
  );
};

export default Update;
