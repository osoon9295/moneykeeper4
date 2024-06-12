import React from "react";
import Router from "./component/shared/Router";
import { useState } from "react";
import { AuthProvider } from "./component/context/AuthContext";

const App = () => {
  const getData = () => {
    const savedData = localStorage.getItem("moneykeeper");
    return savedData ? JSON.parse(savedData) : [];
  };

  const [data, setData] = useState(getData);

  return (
    <div>
      <AuthProvider>
        <Router data={data} setData={setData} />
      </AuthProvider>
    </div>
  );
};

export default App;
