import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StMyPage = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  gap: 10px;
`;

const StProfileImage = styled.img`
  background-color: lightgray;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 10px;
`;

const StTitle = styled.h1`
  padding: 5px;
  font-size: large;
  font-weight: 900;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StInput = styled.input`
  width: 200px;
  height: 25px;
`;

const StButton = styled.button`
  width: 150px;
  height: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ color }) => color || "lightgray"};
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newProfile, setNewProfile] = useState({
    newNickname: "",
    newImage: null,
  });
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // 회원정보 가져오기
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.log("회원정보를 가져오지 못했습니다.", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  // 프로필 수정하기
  const handleProfileChange = async (e) => {
    e.preventDefault();

    const { newNickname, newImage } = newProfile;

    if (window.confirm("이대로 수정하시겠습니까?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("avatar", newImage);
        formData.append("nickname", newNickname);

        const response = await axios.patch(
          "https://moneyfulpublicpolicy.co.kr/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setUserInfo((prevState) => ({
            ...prevState,
            nickname: response.data.nickname,
            avatar: response.data.avatar,
          }));
          alert("프로필이 변경되었습니다.");
          setNewProfile({ newNickname: "", newImage: null });
        } else {
          alert("프로필 변경에 실패했습니다.");
        }
      } catch (error) {
        console.log("프로필을 변경하지 못했습니다.", error);
        alert("프로필 변경에 실패했습니다.");
      }
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  console.log(userInfo);

  return (
    <StMyPage>
      <StTitle>My Page</StTitle>
      <StProfileImage src={userInfo.avatar} />
      <p> 안녕하세요 {userInfo.nickname}님 </p>
      <p> ID : {userInfo.id} </p>

      <StForm onSubmit={handleProfileChange}>
        <StInput
          type="text"
          placeholder="새 닉네임"
          value={newProfile.newNickname}
          onChange={(e) =>
            setNewProfile({ ...newProfile, newNickname: e.target.value })
          }
        />
        <StInput
          type="file"
          placeholder="이미지 파일을 등록해주세요."
          onChange={(e) =>
            setNewProfile({ ...newProfile, newImage: e.target.files[0] })
          }
        />
        <StButton type="submit">프로필 변경</StButton>
      </StForm>
    </StMyPage>
  );
};

export default MyPage;
