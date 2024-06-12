import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const StDetail = styled.div`
  background-color: rgb(237, 170, 45);
  height: fit-content;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0px auto;
`;

const StDetailForm = styled.form`
  background-color: transparent;
  border: 1px solid black;
  width: 80%;
  margin: 10px Auto;
  padding: 20px 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Detail = ({ data, setData }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const selectedData = data.find((datum) => {
    return datum.id === id;
  });

  const { date, category, amount, content } = selectedData;

  const [editDate, setEditDate] = useState(date);
  const [editCategory, setEditCategory] = useState(category);
  const [editAmount, setEditAmount] = useState(amount);
  const [editContent, setEditContent] = useState(content);

  const submitHandler = (e) => {
    e.preventDefault();

    const updateData = data.map((datum) =>
      datum.id === id
        ? {
            ...datum,
            date: editDate,
            category: editCategory,
            amount: editAmount,
            content: editContent,
          }
        : datum
    );

    setData(updateData);
    localStorage.setItem("moneykeeper", JSON.stringify(updateData));

    navigate("/");
  };

  const deleteHandler = (id) => {
    const deletedData = data.filter((datum) => {
      return datum.id !== id;
    });

    setData(deletedData);
    localStorage.setItem("moneykeeper", JSON.stringify(deletedData));

    navigate("/");
  };

  return (
    <StDetail>
      <StDetailForm onSubmit={submitHandler}>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
        />
        <label htmlFor="category">항목</label>
        <select
          id="category"
          value={editCategory}
          onChange={(e) => {
            setEditCategory(e.target.value);
          }}
        >
          <option value="">항목을 선택해주세요</option>
          <option value="🍔">🍔 식비</option>
          <option value="🏠">🏠 집세</option>
          <option value="💰">💰 저금</option>
          <option value="✔️">✔️ 세금</option>
          <option value="etc.">etc. 기타</option>
        </select>

        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={editAmount}
          onChange={(e) => {
            setEditAmount(e.target.value);
          }}
          min="1"
        />
        <label htmlFor="content"> 내용</label>
        <input
          type="text"
          id="content"
          name="content"
          value={editContent}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        />
        <button type="submit">수정하기</button>
      </StDetailForm>
      <button onClick={() => deleteHandler(id)}>삭제하기</button>
      <button onClick={() => navigate("/")}>뒤로가기</button>
    </StDetail>
  );
};

export default Detail;
