
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, IconButton, Paper,List, ListItem, ListItemText, Divider } from '@mui/material';
import searchIcon from "../../search.png";
import styles from "./Search.module.css";
import { searchStock, allStock } from '../../lib/apis/searchApi';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [result, setResult] = useState([]);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [itemsToShowCount, setItemsToShowCount] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    allStock().then((data) => {
      console.log(data.data);
      setResult(data.data);
      setSearchResult(data.data);
      //setItemsToShow(data.data.slice(0, 15)); // 초기에 15개의 아이템 설정
      //setItemsToShowCount(15); // 초기에 보여줄 아이템 수 설정
    });
  }, []);

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
      console.log(newCount);
      setItemsToShow(result.slice(0, newCount));
      return newCount;
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchContainer}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            backgroundColor: '#adadad'
          }}
          onSubmit={(e) => e.preventDefault()} // 폼 제출 방지
        >
          <TextField
            variant="outlined"
            placeholder="검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ ml: 1, flex: 1, backgroundColor: 'white' }}
            InputProps={{
              endAdornment: (
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <img src={searchIcon} alt="search" className={styles.searchIcon} />
                </IconButton>
              ),
            }}
          />
        </Paper>
      </div>
      
      <div className={styles.listContainer}>

        <List>
        {itemsToShow.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={item.name} // 여기서 item은 각각의 결과 데이터입니다. 실제 앱에서는 더 구체적인 데이터 필드를 사용할 수 있습니다.
                secondary={item.stockCode}
                
                // secondary={<React.Fragment>여기에 추가 세부 정보를 넣을 수 있습니다.</React.Fragment>}
              />
            </ListItem>
            {index < itemsToShow.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
        <div ref={observerRef}></div>
      </List>
      </div>

    
      
    </div>
  );
}

export default SearchBar;


