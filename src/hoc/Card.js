import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";

const Container = styled(Card)`
  height: fit-content;
`;

const CustomCard = ({ render, title }) => {
  return (
    <Container>
      <CardHeader title={<Typography variant="h5">{title}</Typography>} />
      <CardContent>{render()}</CardContent>
    </Container>
  );
};

export default CustomCard;
