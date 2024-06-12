import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StLogin = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.h1`
  padding: 5px;
  font-size: large;
  font-weight: 900;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StInput = styled.input`
  width: 200px;
  height: 25px;
`;

const StButton = styled.button`
  width: 150px;
  height: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ color }) => color || "lightgray"};
`;

const Login = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  // 이메일 input
  const inputEmail = (e) => {
    setUserInput({ ...userInput, email: e.target.value });
  };

  // 비밀번호 input
  const inputPassword = (e) => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();

    if (!userInput.email.trim()) {
      return alert("이메일을 입력해주세요");
    } else if (!userInput.password.trim()) {
      return alert("비밀번호를 입력해주세요");
    } else {
      alert("로그인 되었습니다.");
      setUserInput({ email: "", password: "" });
    }
  };

  return (
    <StLogin>
      <StTitle>로그인</StTitle>
      <StForm onSubmit={login}>
        <StInput
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={inputEmail}
          value={userInput.email}
        />
        <StInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={inputPassword}
          value={userInput.password}
        />
        <StButton type="submit" color="rgb(237, 170, 45)">
          로그인
        </StButton>
        <StButton onClick={() => navigate("/signup")}>회원가입</StButton>
      </StForm>
    </StLogin>
  );
};

export default Login;
