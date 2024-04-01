import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Navbar
      className="footer-navbar"
      fixed="bottom"
      style={{
        backgroundColor: "#ffffff",
        justifyContent: "center",
        minHeight: "20px",
      }}
    >
      <Container>
        <Navbar.Text className="footer-copyright-text">
          <Link to="#" onClick={() => window.history.back()}>
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/back.png"}
              alt="back"
              className="footer-icon"
            />
          </Link>
          <Link to="/main">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/house.png"}
              alt="House"
              className="footer-icon"
            />
          </Link>
          <Link to="/mypage">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/favorite.png"}
              alt="userFavorite"
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
