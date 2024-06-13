import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const TotalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const logout = (token) => {
    localStorage.removeItem("accessToken", token);
    setIsAuthenticated(false);
  };

  const getExpenseList = () => {
    const savedExpenseList = localStorage.getItem("moneykeeper");
    return savedExpenseList ? JSON.parse(savedExpenseList) : [];
  };

  const [expenseList, setExpenseList] = useState(getExpenseList);

  return (
    <Context.Provider
      value={{ isAuthenticated, login, logout, expenseList, setExpenseList }}
    >
      {children}
    </Context.Provider>
  );
};
