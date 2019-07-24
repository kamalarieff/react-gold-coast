import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";

const Container = styled(Card)`
  height: fit-content;
  grid-column: ${props => `span ${props.span}` || "unset"};
`;

const CustomCard = ({ render, title, span, action }) => {
  return (
    <Container span={span}>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        action={action ? action : ""}
      />
      <CardContent>{render()}</CardContent>
    </Container>
  );
};

export default CustomCard;
