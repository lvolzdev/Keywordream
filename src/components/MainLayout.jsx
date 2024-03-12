import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Container
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <Outlet />
          </Container>
          <Footer />
        </div>
      </div>
    </>
  );
}

<div>MainLayout</div>;
