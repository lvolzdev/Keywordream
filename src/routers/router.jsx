import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NavLayout from "../components/NavLayout";
import Landing from "../routes/Landing/Landing";
import MainPage from "../routes/Main/MainPage";
import Signup from "../routes/Landing/Signup";
import Login from "../routes/Landing/Login";
import Search from "../routes/Search/Search";
import Price from "../routes/Price/Price";
import Mypage from "../routes/Mypage/Mypage";
import Keyword from "../routes/Keyword/Keyword";
import News from "../routes/News/News";
import NewsDetail from "../routes/News/NewsDetail";
import Chart from "../routes/Chart/Chart";
import Info from "../routes/Info/Info";
import DetailLayout from "../components/DetailLayout";

export const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      // 여기서부터 NavBar 사용
      {
        path: "",
        element: <NavLayout />,
        children: [
          {
            path: "/main",
            element: <MainPage />,
          },

          // DetailLayout을 직접 적용
          {
            path: "/detail/:stockCode",
            element: <DetailLayout />,
            children: [
              { path: "keyword", element: <Keyword /> },
              { path: "news", element: <News /> },
              { path: "chart", element: <Chart /> },
              { path: "info", element: <Info /> },
            ],
          },

          {
            path: "/detail/:stockCode/news/:newsId",
            element : <NewsDetail/>
          },

          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/price/:stockId",
            element: <Price />,
          },
          {
            path: "/mypage",
            element: <Mypage />,
          },
        ],
      },
    ],
  },
]);
