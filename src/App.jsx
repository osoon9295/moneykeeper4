import React from "react";
import Router from "./component/shared/Router";
import { useState } from "react";

const App = () => {
  const getData = () => {
    const savedData = localStorage.getItem("moneykeeper");
    return savedData ? JSON.parse(savedData) : [];
  };
  const [data, setData] = useState(getData);

  return (
    <div>
      <Router data={data} setData={setData} />
    </div>
  );
};

export default App;
