import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import { Context, TotalProvider } from "../context/Context";

const Router = () => {
  // 로그인 필요한 페이지에 접근 할 수 있도록 하는 컴포넌트
  const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(Context);
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
  };

  // 로그인 필요없는 페이지에 접근 할 수 있도록 하는 컴포넌트
  const PublicRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useContext(Context);
    return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
  };

  return (
    <div>
      <BrowserRouter>
        <TotalProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/login" element={<PublicRoute element={Login} />} />
              <Route
                path="/signup"
                element={<PublicRoute element={Signup} />}
              />
              <Route
                path="/mypage"
                element={<PrivateRoute element={MyPage} />}
              />
            </Routes>
          </Layout>
        </TotalProvider>
      </BrowserRouter>
    </div>
  );
};

export default Router;
