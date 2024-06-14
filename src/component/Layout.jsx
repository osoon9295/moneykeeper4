import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./context/Context";

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
  const { isAuthenticated, logout, userInfo } = useContext(Context);

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <StHeader>
      <StLink>
        {isAuthenticated ? (
          <>
            ✨환영합니다! {userInfo.nickname}님
            <StLinkButton onClick={handleLogout}>로그아웃</StLinkButton>
            <StLinkButton to="/mypage">마이페이지</StLinkButton>
          </>
        ) : (
          <>
            <StLinkButton to="/login">로그인</StLinkButton>
            <StLinkButton to="/signup">회원가입</StLinkButton>
          </>
        )}
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
