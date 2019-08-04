import React from "react";
import styled from "@emotion/styled";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "../../hoc/Card";
import UserOverview from "./user";
import AccomodationOverview from "./accommodation";

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
        <AccomodationOverview />
      </Grid>
    )}
  />
);

const StyledPaper = ({ children }) => (
  <Paper>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={1}
    >
      {children}
    </Box>
  </Paper>
);

export default Overview;
export { StyledPaper };
