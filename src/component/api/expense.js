import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:4000";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    alert("데이터를 불러오지 못했습니다.");
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (error) {
    alert("데이터를 불러오지 못했습니다.");
  }
};

export const postExpenses = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (error) {
    alert("에러가 발생했습니다.");
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const { date } = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return date;
  } catch (error) {
    console.log(error);
    alert("수정중 에러가 발생했습니다.");
  }
};

export const deleteExpense = async (id) => {
  try {
    const { date } = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return date;
  } catch (error) {
    console.log(error);
    alert("삭제중 에러가 발생했습니다.");
  }
};
