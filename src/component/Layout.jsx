import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StHeader = styled.header`
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

const Header = ({ onClick }) => {
  return <StHeader onClick={onClick}>MONEYKEEPER</StHeader>;
};

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        onClick={() => {
          navigate("/");
        }}
      />
      {children}
    </div>
  );
};

export default Layout;
