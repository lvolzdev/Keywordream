import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import MainPage from "../routes/MainPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);
