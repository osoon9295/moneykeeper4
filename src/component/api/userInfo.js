import axios from "axios";

const JWT = "https://moneyfulpublicpolicy.co.kr/";

export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${JWT}user`, {
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
  // alert("회원정보를 가져오지 못했습니다.");
};
