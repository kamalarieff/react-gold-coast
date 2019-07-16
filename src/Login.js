import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "@emotion/styled";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2em;
  justify-items: center;
`;

const LOGIN = gql`
  mutation($username: String!) {
    signIn(username: $username) {
      token
    }
  }
`;

const Login = props => {
  const [username, setUsername] = useState("");

  const handleChange = e => setUsername(e.target.value);

  return (
    <Container>
      <TextField
        id="outlined-name"
        label="Username"
        margin="normal"
        variant="outlined"
        value={username}
        onChange={handleChange}
      />
      <Mutation
        mutation={LOGIN}
        variables={{ username }}
        update={(client, { data }) => {
          localStorage.setItem("token", data.signIn.token);
          client.writeData({ data: { isLoggedIn: true } });
          props.history.push("/");
        }}
        //   onCompleted={({ signIn: { token } }) => {
        //     localStorage.setItem("token", token);
        //     client.writeData({ data: { isLoggedIn: true } });
        //     console.log("client", client);
        //     console.log("token", token);
        //   }}
      >
        {(signIn, { data, loading, error }) => (
          <>
            <Button variant="contained" color="primary" onClick={signIn}>
              Login
            </Button>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </>
        )}
      </Mutation>
    </Container>
  );
};

export default Login;
