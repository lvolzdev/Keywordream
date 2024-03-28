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
import Info from "../routes/Info/Info";
import Chart from "../routes/Chart/Chart";
import DetailLayout from "../components/DetailLayout";
import DailyPrice from "../routes/Chart/DailyPrice";
import DetailKeyword from "../routes/Main/DetailKeyword";
import SubDetailLayout from "../components/SubDetailLayout";
import MarketPriceLayout from "../routes/Chart/MarketPriceLayout";
import RealtimePrice from "../routes/Chart/RealtimePrice";

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
          {
            path: "/keyword/:keyword",
            element: <DetailKeyword />,
          },

          // DetailLayout을 직접 적용
          {
            path: "/detail/:stockCode",
            element: <DetailLayout />,
            children: [
              {
                element : <SubDetailLayout/>,
                children : [
                  { path: "keyword", element: <Keyword /> },
                  { path: "news", element: <News /> },
                  { path: "chart", element: <Chart /> },
                  { path: "info", element: <Info /> },
                ]
              },
              {
                path: "chart/market",
                element: <MarketPriceLayout />,
                children : [
                  { path: "daily", element: <DailyPrice/>},
                  { path: "realtime", element: <RealtimePrice/>}
                ]
              },
            ],
          },
          {
            path: "/detail/:stockCode/news/:newsId",
            element: <NewsDetail />,
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
