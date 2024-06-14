import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Context } from "./context/Context";
import { postExpenses } from "./api/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const StForm = styled.div`
  width: 750px;
  border: 1px solid black;
  margin: 0px auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

const Form = () => {
  const { userInfo, isAuthenticated } = useContext(Context);

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      // 새로고침 -> state가 날라감 -> user도 날라감
      // navigate(0);
    },
  });

  const addValue = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const newExpense = {
      date: date,
      month: new Date(date).getMonth() + 1,
      category: category,
      amount: Number(amount),
      content: content,
      createdBy: userInfo.userId,
    };

    mutation.mutate(newExpense);

    setDate("");
    setCategory("");
    setAmount(0);
    setContent("");
  };

  return (
    <StForm>
      <div>
        <form onSubmit={addValue}>
          <label htmlFor="date">날짜: </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <label htmlFor="category">항목: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">항목을 선택해주세요</option>
            <option value="🍔">🍔 식비</option>
            <option value="🏠">🏠 집세</option>
            <option value="💰">💰 저금</option>
            <option value="✔️">✔️ 세금</option>
            <option value="etc.">etc. 기타</option>
          </select>

          <label htmlFor="amount">금액:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            min="1"
          />

          <label htmlFor="content">내용: </label>
          <input
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <button type="submit"> 저장 </button>
        </form>
      </div>
    </StForm>
  );
};

export default Form;
