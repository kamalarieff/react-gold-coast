import React from "react";
import styled from "@emotion/styled";
import Card from "../../hoc/Card";
import UserOverview from "./user";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const Overview = () => (
  <Card
    title="Overview"
    render={() => (
      <Grid>
        <UserOverview />
      </Grid>
    )}
  />
);

export default Overview;
