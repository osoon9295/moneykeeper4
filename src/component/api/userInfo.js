import axios from "axios";

const JWT = "https://moneyfulpublicpolicy.co.kr";

export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${JWT}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
