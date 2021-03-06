import React from "react";
import "./App.css";
import Users from "./User";
import Overview from "./modules/overview";
import Todo from "./modules/todo";
import Itenary from "./Itenary";
import Budget from "./Budget";
import { ExpenseCard as Expenses } from "./components/Expense";
import { StaticDataProvider } from "./context";
import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: 90em;
  margin: 0 auto;
  justify-content: center;
  grid-gap: 1em;
  padding: 1em;
`;

function Home() {
  return (
    <Container>
      <StaticDataProvider>
        <Todo />
        <Overview />
        <Users />
        <Itenary />
        <Budget />
        <Expenses />
      </StaticDataProvider>
    </Container>
  );
}

export default Home;
