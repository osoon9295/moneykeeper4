import React from "react";
import styled from "styled-components";
import ExpenseList from "./ExpenseList";
import { useState } from "react";

const StMonthList = styled.div`
  margin: 30px auto;
  padding: 10px;
  width: 850px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
`;

const StMonthButton = styled.button`
  margin: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: none;
  background-color: darkgray;

  &:hover {
    background-color: rgb(237, 170, 45);
    cursor: pointer;
  }
`;

const Months = ({ data }) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedMonth, setSelectedMonth] = useState(null);

  const clickMonth = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div>
      <StMonthList>
        {months.map((month) => (
          <StMonthButton key={month} onClick={() => clickMonth(month)}>
            {month}
          </StMonthButton>
        ))}
      </StMonthList>
      <ExpenseList data={data} selectedMonth={selectedMonth} />
    </div>
  );
};

export default Months;
