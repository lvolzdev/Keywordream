import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <Navbar
      className="header-navbar"
      fixed="top"
      style={{ height: "8%", padding: "1.7vh 4vh", backgroundColor: "white" }}
    >
      <div className="header-title">
        <Link to="/">
          <img
            src={logo}
            width="160px"
            className="logo-img"
            alt="Keywordream logo"
            style={{ marginTop: "2rem", paddingLeft: "0vh" }}
          />
        </Link>

        <Link to="/search">
          {" "}
          <img
            src={process.env.PUBLIC_URL + "/search.png"}
            alt="search glass"
            className="header-icon"
          />
        </Link>
      </div>
      <Container></Container>
    </Navbar>
  );
};

export default Header;
