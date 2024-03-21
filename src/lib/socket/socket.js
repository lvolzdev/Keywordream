import { io } from "socket.io-client";
const BASE_URL = 'http://localhost:3003'
const socket = io(BASE_URL);

export const joinRoom = (stockCode) => {
    socket.emit("joinRoom", stockCode);
}

export const leaveRoom = (stockCode) => {
    socket.emit("leaveRoom", stockCode);
}

export const receiveStockPrice = (stockCode, setPrice, setRatio) => {
    socket.on("receiveStockPrice", data => {
        //{stockCode: stock_code, current:detail[2], ratioPrevious: detail[5]}
        if(stockCode === data.stockCode){
            console.log('종목정보 수신:', stockCode )
            setPrice(data.current);
            setRatio(data.ratioPrevious);
        }
    });
}