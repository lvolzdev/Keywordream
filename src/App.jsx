import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
