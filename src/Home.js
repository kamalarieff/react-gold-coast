import React from "react";
import "./App.css";
import Users from "./User";
import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: 90em;
  margin: 0 auto;
  justify-content: center;
  grid-gap: 1em;
`;

function Home() {
  return (
    <Container>
      <Users />
    </Container>
  );
}

export default Home;
