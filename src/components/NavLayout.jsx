import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function NavLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Container
          style={{
            background: "#F6FBFF", // 배경색
            flex: 1,
          }}
        >
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
