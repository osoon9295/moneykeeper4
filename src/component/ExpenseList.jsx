import React from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";

const StExpenseList = styled.div`
  height: fit-content;
  width: 750px;
  background-color: rgb(237, 170, 45);

  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
`;

const ExpenseList = ({ data, selectedMonth }) => {
  const filterdExpenseList = data.filter((datum) => {
    const date = new Date(datum.date);
    return date.getMonth() + 1 === selectedMonth;
  });

  return (
    <StExpenseList>
      {filterdExpenseList.map((datum) => {
        return <ExpenseItem key={datum.id} datum={datum} />;
      })}
    </StExpenseList>
  );
};

export default ExpenseList;
