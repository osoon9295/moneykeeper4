import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/userInfo";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const TotalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserInfo()
        .then((res) => {
          setUserInfo(res);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.log(error);
          alert("회원정보를 가져오지 못했습니다.");
          navigate("/login");
        });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // const getUserInfo = (userInfo) => {
  //   setUserInfo(userInfo);
  //   console.log(userInfo);
  // };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setUserInfo,
        userInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
