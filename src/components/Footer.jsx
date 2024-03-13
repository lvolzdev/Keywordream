import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <Navbar
      className="footer-navbar"
      fixed="bottom"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <Container>
        <Navbar.Text className="footer-copyright-text">
          &copy; 2024. Keywordream Co. All Rights Reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
