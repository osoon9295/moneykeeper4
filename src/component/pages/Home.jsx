import React, { useContext } from "react";
import Form from "../Form";
import Months from "../Months";
import { Context } from "../context/Context";

const Home = () => {
  const { expenseList, setExpenseList } = useContext(Context);

  return (
    <div>
      <Form />
      <Months />
    </div>
  );
};

export default Home;
