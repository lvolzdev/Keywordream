import { io } from "socket.io-client";
const BASE_URL = "http://localhost:3003";
const socket = io(BASE_URL);

export const joinRoom = (stockCode) => {
  socket.emit("joinRoom", stockCode);
};

export const leaveRoom = (stockCode) => {
  socket.emit("leaveRoom", stockCode);
};

export const receiveStockPrice = (stockCode, setPrice, setRatio) => {
  socket.on("receiveStockPrice", (data) => {
    //{stockCode: stock_code, time:detail[1], current:detail[2], ratioPrevious: detail[5]}
    if (stockCode === data.stockCode) {
      // console.log('종목정보 수신:', stockCode )
      setPrice(data.current);
      setRatio(data.ratioPrevious);
    }
  });
};

export const receiveStockPriceList = (stockCode, updateData) => {
  socket.on("receiveStockPrice", (data) => {
    if (stockCode === data.stockCode) {
      const newData = {
        key: data.key,
        close: data.current,
        ratio: data.ratioPrevious,
        time: data.time,
        open: data.open,
        high: data.high,
        low: data.low,
      };
      updateData(newData);
    }
  });
};
