import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getExpense, deleteExpense, putExpense } from "../api/expense";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: selectedExpense,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenses", id],
    queryFn: getExpense,
  });

  const [editDate, setEditDate] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (selectedExpense) {
      const { date, category, amount, content } = selectedExpense;

      setEditDate(date);
      setEditCategory(category);
      setEditAmount(amount);
      setEditContent(content);
    }
  }, [selectedExpense]);

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const updateExpense = {
      ...selectedExpense,
      date: editDate,
      category: editCategory,
      amount: editAmount,
      content: editContent,
    };

    mutationEdit.mutate(updateExpense);
  };

  const deleteHandler = () => {
    mutationDelete.mutate(id);
  };

  if (isPending) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }
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
