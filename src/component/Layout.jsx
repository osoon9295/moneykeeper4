import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StHeader = styled.header`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

const StLogo = styled.div`
  background-color: rgb(237, 170, 45);
  color: white;
  font-size: 30px;
  height: 100px;
  width: 400px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const StLink = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: row;
  gap: 10px;
`;
const StLinkButton = styled(Link)`
  color: gray;

  /* position: absolute; */
  font-size: large;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <StLink>
        <StLinkButton to="/login">로그인</StLinkButton>
        <StLinkButton to="/signup">회원가입</StLinkButton>
      </StLink>
      <StLogo
        onClick={() => {
          navigate("/");
        }}
      >
        MONEYKEEPER
      </StLogo>
    </StHeader>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
