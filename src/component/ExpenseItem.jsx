import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./context/Context";

const StExpenseItem = styled.button`
  background-color: transparent;
  width: 96%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid white;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const StSpan = styled.span`
  font-size: 15px;
  margin: 10px;
`;

const ExpenseItem = ({ expense }) => {
  const { userInfo } = useContext(Context);
  const { id, date, category, amount, content, createdBy } = expense;

  const navigate = useNavigate();

  return (
    <StExpenseItem
      onClick={() => {
        userInfo.userId === createdBy
          ? navigate(`/detail/${id}`)
          : alert("작성자만 접근 할 수 있습니다. ");
      }}
    >
      <StSpan>작성자: &nbsp;{createdBy}</StSpan>
      <StSpan>{date}</StSpan>
      <StSpan>항목: &nbsp;{category}</StSpan>
      <StSpan>내용: &nbsp;{content}</StSpan>
      <StSpan>금액: &nbsp;{amount}</StSpan>
    </StExpenseItem>
  );
};

export default ExpenseItem;
