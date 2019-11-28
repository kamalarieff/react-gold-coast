import React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import Box from "@material-ui/core/Box";
import { Typography, List } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { GET_EXPENSES, GET_USERS } from "../../index";

const Report = () => {
  const {
    loading,
    error,
    data: { expenses }
  } = useQuery(GET_EXPENSES);

  const {
    loading: userLoading,
    error: userError,
    data: { users }
  } = useQuery(GET_USERS);

  const [user, setUser] = React.useState(users[0]);

  const handleChange = e => {
    const res = users.find(user => user.id === e.target.value);
    setUser(res);
  };

  const res = expenses.map(expense => {
    const value = expense.value;
    const owner = expense.user;
    const sharedWithCount = expense.sharedWith.length;
    const totalUsers = sharedWithCount + 1;
    const perPersonToPay = value / totalUsers;
    const sharedWithResult = expense.sharedWith.map(x => {
      return {
        item: expense.item,
        total: value,
        payee: x,
        receiver: owner,
        value: perPersonToPay
      };
    });

    const ownerMustGet = expense.sharedWith.map(x => {
      return {
        item: expense.item,
        total: value,
        owner,
        from: x,
        value: perPersonToPay
      };
    });

    return { toPay: sharedWithResult, ownerMustGet };
  });

  const getArray = R.curry(objKey =>
    R.pipe(
      R.map(i => i[objKey]),
      R.flatten
    )
  );

  const getToPayArray = getArray("toPay");
  const getOwnerMustGetArray = getArray("ownerMustGet");

  const toPayArray = getToPayArray(res);
  const ownerMustGetArray = getOwnerMustGetArray(res);

  const fiterByUsername = R.curry((type, username) =>
    R.filter(R.pathEq([type, "username"], username))
  );

  const username = user.username;
  const filterHasToPay = fiterByUsername("payee");
  const filterOwnerMustGet = fiterByUsername("owner");
  const filteredHasToPay = filterHasToPay(username)(toPayArray);
  console.log("TCL: Report -> filteredHasToPay", filteredHasToPay);
  const filteredHaveToGet = filterOwnerMustGet(username)(ownerMustGetArray);
  console.log("TCL: Report -> filteredHaveToGet", filteredHaveToGet);

  const totalPerUser = R.pipe(
    R.groupBy(i => i.from.username),
    R.map(x => x.reduce((acc, cur) => acc + cur.value, 0)),
    R.toPairs
  )(filteredHaveToGet);
  console.log("TCL: Report -> totalPerUser", totalPerUser);

  return (
    <Box>
      <FormControl>
        <Select value={user.id} onChange={handleChange}>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h1">Report</Typography>
      {filteredHasToPay.map(i => (
        <p>
          {username} has to pay {i.receiver.username} {i.value}
        </p>
      ))}
      {totalPerUser.map(i => (
        <p>
          {username} has to get from {i[0]} a total amount of {i[1]}
        </p>
      ))}
    </Box>
  );
};

export default Report;
