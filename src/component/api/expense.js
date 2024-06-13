import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:4000/";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}expenses`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert("뭔가 잘못된거 같아요!");
  }
};
