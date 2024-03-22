import instance from "./baseApi";

// 당일 시세 데이터
export async function getChart(stockCode) {
  return await instance.get(`/chart/${stockCode}`);
}
