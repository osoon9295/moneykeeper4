import React from "react";
import Form from "../Form";
import Months from "../Months";
import { useState } from "react";

const Home = ({ data, setData }) => {
  // const getData = () => {
  //   const savedData = localStorage.getItem("moneykeeper");
  //   return savedData ? JSON.parse(savedData) : [];
  // };
  // const [data, setData] = useState(getData);
  return (
    <div>
      <Form data={data} setData={setData} />
      <Months data={data} />
    </div>
  );
};

export default Home;
