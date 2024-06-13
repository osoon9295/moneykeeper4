import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./api/expense";

const StExpenseList = styled.div`
  height: fit-content;
  width: 750px;
  background-color: rgb(237, 170, 45);

  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
`;

const ExpenseList = ({ selectedMonth }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (isPending) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다. </div>;
  }

  const filterdExpenseList = data.filter(
    (expense) => expense.month === selectedMonth
  );

  return (
    <StExpenseList>
      {filterdExpenseList.map((expense) => {
        return <ExpenseItem key={expense.id} expense={expense} />;
      })}
    </StExpenseList>
  );
};

export default ExpenseList;
