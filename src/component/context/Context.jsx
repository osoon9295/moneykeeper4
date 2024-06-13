import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const TotalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
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
  const getUserInfo = (userInfo) => {
    setUserInfo(userInfo);
    console.log(userInfo);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getUserInfo,
        userInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
