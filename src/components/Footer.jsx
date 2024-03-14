import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";
import bluehouse from "../bluehouse.png";
import search from "../search.png";
import treasure from "../treasure_box.png";

const Footer = () => {
  return (
    <Navbar
      className="footer-navbar"
      fixed="bottom"
      style={{ backgroundColor: "#F0F0F0", justifyContent: "center" }}
    >
      <Container>
        <Navbar.Text className="footer-copyright-text">
          <img src={search} alt="search glass" className="footer-icon" />
          <img src={bluehouse} alt="Blue House" className="footer-icon" />
          <img src={treasure} alt="treasure box" className="footer-icon" />
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
