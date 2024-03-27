import React, { useEffect, useState } from 'react';
import {
  joinRoom,
  leaveRoom,
  receiveStockPriceList,
} from "../../lib/socket/socket";
import { useParams } from 'react-router-dom';

export default function RealtimePrice() {
  const [dataList, setDataList] = useState([]);
  const stockCode = useParams().stockCode;

  useEffect(() => {
    joinRoom(stockCode);

    return () => {
      leaveRoom(stockCode);
    }
  },[stockCode])

  useEffect(()=>{
    receiveStockPriceList(stockCode, updateData);
  },[dataList])

  const updateData = (newData) => {
    
    setDataList(dataList.concat(newData))
  }

  return (
    <div>
      {
        dataList.reverse().map(data => (
          <div key={data.key}> {data.time} {data.price} {data.ratio}</div>
        ))
      }
    </div>
  )
}
