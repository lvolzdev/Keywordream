import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Typography,
} from "@mui/material";
import styles from "./Search.module.css";
import { searchStock, allStock } from "../../lib/apis/searchApi";
import { crawlExtractKeyword } from "../../lib/apis/flask";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [myStock, setMyStock] = useState(["010140", "109610"]); // Initialize myStock array with favorite stock codes
  const [result, setResult] = useState([]);
  const [allData, setAllData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [itemsToShowCount, setItemsToShowCount] = useState(0);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    allStock().then((data) => {
      setResult(data.data);
      setAllData(data.data);
      //setItemsToShow(data.data.slice(0, 15)); // 초기에 15개의 아이템 설정
      //setItemsToShowCount(15); // 초기에 보여줄 아이템 수 설정
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        const filteredResults = allData.filter(
          (item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.stockCode.includes(inputValue)
        );
        setResult(filteredResults);
      } else {
        setResult(allData);
      }
    }, 50); // 사용자 입력이 멈춘 후 50ms 뒤에 검색 실행

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, allData]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [result]);

  const loadMoreItems = () => {
    setItemsToShowCount((prevCount) => {
      const newCount = prevCount + 6;
      setItemsToShow(result.slice(0, newCount));
      return newCount;
    });
  };

  // 사용자 입력을 처리하는 함수
  const handleSearchChange = (value) => {
    setInputValue(value); // 입력값을 상태로 설정합니다.
  };

  const navigateToDetail = async (stockCode) => {
    navigate(`/detail/${stockCode}/keyword`);
  };

  const toggleFavoriteStock = (stockCode) => {
    setMyStock((prevStocks) => {
      if (prevStocks.includes(stockCode)) {
        return prevStocks.filter((code) => code !== stockCode);
      } else {
        return [...prevStocks, stockCode];
      }
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.searchContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#4B4B4B",
            fontWeight: "bold",
            marginBottom: 0.5,
          }}
        >
          <span style={{ color: "#007BFF" }}>3886</span>개의 종목을 검색할 수
          있어요
        </Typography>
        <TextField
          variant="outlined"
          placeholder="종목명 또는 종목코드를 검색해보세요."
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ ml: 1, flex: 1, backgroundColor: "white" }}
          InputProps={{
            sx: {
              ml: 1,
              flex: 1,
              backgroundColor: "white",
              borderRadius: 20,
              minWidth: 320,
            },
            endAdornment: (
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <img
                  src={process.env.PUBLIC_URL + "/search.png"}
                  loading="lazy"
                  alt="search"
                  className={styles.searchIcon}
                />
              </IconButton>
            ),
          }}
        />
      </div>

      {/* <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            backgroundColor: "#ffffff",
            // border: "1px solid #ccc",
            borderRadius: 20,
          }}
          onSubmit={(e) => e.preventDefault()} // 폼 제출 방지
        >
          <TextField
            variant="outlined"
            placeholder="종목명 또는 종목코드를 검색해보세요."
            value={inputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ ml: 1, flex: 1, backgroundColor: "white" }}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/search.png"}
                    loading="lazy"
                    alt="search"
                    className={styles.searchIcon}
                  />
                </IconButton>
              ),
            }}
          />
        </Paper> */}

      <div className={styles.listContainer}>
        <List>
          {result.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                onClick={() => navigateToDetail(item.stockCode)}
              >
                <ListItemAvatar>
                  <img
                    src={
                      item.name.slice(0, 5) === "KODEX"
                        ? "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png"
                        : `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${item.stockCode}.png`
                    }
                    alt=""
                    className={styles.stockImg}
                    onError={(e) => {
                      e.target.src =
                        "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name} // 종목 이름
                  secondary={item.stockCode} // 종목 코드
                />
                <div
                  className={styles.heartContainer}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteStock(item.stockCode);
                  }} // Add onClick event to toggle favorite stock
                >
                  <img
                    src={
                      myStock.includes(item.stockCode)
                        ? FilledHeart
                        : UnfilledHeart
                    }
                    className={styles.heart}
                    alt="Heart"
                  />
                </div>
              </ListItem>
              {index < result.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
          <div ref={observerRef}></div>
        </List>
      </div>
    </div>
  );
}

export default SearchBar;
