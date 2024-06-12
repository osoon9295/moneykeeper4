import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StSignup = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
`;

const StTitle = styled.h1`
  padding: 10px;
  font-size: large;
  font-weight: 900;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StInput = styled.input`
  width: 200px;
  height: 25px;
`;

const StList = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & label {
    width: 100px;
    display: flex;
    justify-content: end;
  }
`;

const StButton = styled.button`
  width: 150px;
  height: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ color }) => color || "lightgray"};
`;

const Signup = () => {
  const navigate = useNavigate();

  // 입력한 정보의 값
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  // 정보값에 input에 작성된 정보 넣어주기
  const inputEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };
  const inputPassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };
  const inputConfirmPassword = (e) => {
    setUserInfo({ ...userInfo, confirmPassword: e.target.value });
  };
  const inputNickname = (e) => {
    setUserInfo({ ...userInfo, nickname: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      try {
        setUserInfo({
          email: "",
          password: "",
          confirmPassword: "",
          nickname: "",
        });

        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/register",
          {
            id: userInfo.email,
            password: userInfo.password,
            nickname: userInfo.nickname,
          }
        );

        const data = response.data;

        if (data.success) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        } else {
          alert("회원가입 중 오류 발생. 다시 시도해주세요.");
        }
      } catch (error) {
        console.log("Signup error", error);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <StSignup>
      <StTitle>회원가입</StTitle>
      <StForm onSubmit={handleSignup}>
        <StList>
          <label>아이디&nbsp;</label>
          <StInput
            type="email"
            placeholder="이메일을 입력하세요"
            onChange={inputEmail}
            value={userInfo.email}
          />
        </StList>
        <StList>
          <label>비밀번호&nbsp;</label>
          <StInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={inputPassword}
            value={userInfo.password}
          />
        </StList>
        <StList>
          <label>비밀번호 확인&nbsp;</label>
          <StInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={inputConfirmPassword}
            value={userInfo.confirmPassword}
          />
        </StList>
        <StList>
          <label>닉네임&nbsp;</label>
          <StInput
            type="text"
            placeholder="닉네임을 입력하세요"
            onChange={inputNickname}
            value={userInfo.nickname}
          />
        </StList>
        <StButton color="rgb(237, 170, 45);">회원가입</StButton>
        <StButton onClick={() => navigate("/login")}>로그인</StButton>
      </StForm>
    </StSignup>
  );
};

export default Signup;
