import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Welcome from "../../assets/image/Welcome.gif";
import Logo from "../../assets/image/logo.png";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleLogin = () => {
    if (nickname === "") {
      setShowAlert(true);
    } else {
      localStorage.setItem("nickName", nickname);
      navigate("/main");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        width="55%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className={styles.logoContainer}>
          <img src={Logo} alt="" className={styles.logo} />
        </div>
        <div className={styles.logoContainer}>
          <img src={Welcome} alt="" className={styles.welcome} />
        </div>
        <Typography variant="h6" gutterBottom>
          닉네임을 입력하세요
        </Typography>
        <TextField
          label="닉네임"
          variant="outlined"
          value={nickname}
          onChange={handleNicknameChange}
          className={styles.input}
          onKeyDown={handleKeyDown}
          sx={{ marginBottom: "1vh" }}
        />
        {showAlert && (
          <Alert
            severity="warning"
            className={styles.alert}
            sx={{ marginBottom: "1vh" }}
          >
            닉네임을 입력해주세요
          </Alert>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ bgcolor: "#0046FF" }}
          className={styles.button}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
}
