import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Navbar
      className="footer-navbar"
      fixed="bottom"
      style={{ backgroundColor: "#F0F0F0", justifyContent: "center" }}
    >
      <Container>
        <Navbar.Text className="footer-copyright-text">
          <Link to="/search">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/search.png"}
              alt="search glass"
              className="footer-icon"
            />
          </Link>
          <Link to="/main">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/bluehouse.png"}
              alt="Blue House"
              className="footer-icon"
            />
          </Link>
          <Link to="/mypage">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/treasure_box.png"}
              alt="treasure box"
              className="footer-icon"
            />
          </Link>
          {/* &copy; 2024. Keywordream Co. All Rights Reserved. */}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
