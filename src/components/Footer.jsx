import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";
import bluehouse from "../bluehouse.png";
import search from "../search.png";
import treasure from "../treasure_box.png";
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
          <Link to="/search"> {/* 돋보기 이미지를 Link 컴포넌트로 감쌉니다. */}
            <img src={search} alt="search glass" className="footer-icon" />
          </Link>
          <Link to="/main"> {/* 돋보기 이미지를 Link 컴포넌트로 감쌉니다. */}
            <img src={bluehouse} alt="Blue House" className="footer-icon" />
          </Link>
          <Link to="/mypage"> {/* 돋보기 이미지를 Link 컴포넌트로 감쌉니다. */}
            <img src={treasure} alt="treasure box" className="footer-icon" />
          </Link>
          {/* &copy; 2024. Keywordream Co. All Rights Reserved. */}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;

