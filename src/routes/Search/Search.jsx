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
import { searchStock, allStock, countStock } from "../../lib/apis/searchApi";
import { crawlExtractKeyword } from "../../lib/apis/flask";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";
import { end } from "@popperjs/core";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [myStock, setMyStock] = useState(["010140", "109610"]); // Initialize myStock array with favorite stock codes
  const [result, setResult] = useState([]);
  const [allData, setAllData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [itemsToShowCount, setItemsToShowCount] = useState(0);
  const navigate = useNavigate();
  const obsRef = useRef(null);
  const preventRef = useRef(true);
  const [page, setPage] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const changeResults = () => {
    // endRef.current = false
    // console.log(endRef.current);
    setResult([]);
    setPage(-1);
    getCountStock();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      console.log(target.isIntersecting)
      if(preventRef && target.isIntersecting){
        preventRef.current = false;
        setPage((prev) => prev+1);
      }
    }, {
      threshold : 0.5,
    });

    if(obsRef.current){
      observer.observe(obsRef.current);
    }
    
  }, []);

  useEffect(() => {
    getCountStock()
  }, [])

  const getCountStock = async () => {
    let res;
    if(inputValue === ""){
      res = await countStock();
    } else if(isNaN(Number(inputValue))){
      res = await countStock(undefined, inputValue);
    } else {
      res = await countStock(inputValue, undefined);
    }
    if(res.data){
      preventRef.current = true;
      setCount(res.data);
    } else {
      console.log("데이터 없음")
    }
  }

  useEffect(() => {
    console.log("page : ", page)
    if(page >= 0){
      fetchData();
    }
  }, [page]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    let res;
    try{
      if(inputValue === ""){
        res = await searchStock(page, undefined, undefined);
      } else if(isNaN(Number(inputValue))){
        res = await searchStock(page, undefined, inputValue);
      } else {
        res = await searchStock(page, inputValue, undefined);
      }
      console.log(res.data);
      // if(res.data.length < 50) {
      //   endRef.current = true;
      // }
      setResult([...result, ...res.data])
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      changeResults();
    }
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
          <span style={{ color: "#007BFF" }}>{count}</span>개의 종목을
          검색할 수 있어요
        </Typography>
        <TextField
          variant="outlined"
          placeholder="종목명 또는 종목코드를 검색해보세요."
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
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
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={changeResults}
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
      </div>

        <div className={styles.listContainer}>
          <List>
            {result.map((item, index) => (
              <React.Fragment key={item.stockCode}>
                <ListItem
                  alignItems="center"
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
          </List>
          {isLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
          <div ref={obsRef} style={{height:"50px"}}></div>
        </div>
    </div>
  );
}

export default SearchBar;
