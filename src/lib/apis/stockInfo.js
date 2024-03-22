import instance from "./baseApi";

// 서버로부터 신한투자증권 선정 조회순, 상승순, 거래순 가져오기
export const fetchStockInfo = async (stockCode) => {
  try {
    const response = await instance.get(`/stockInfo/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stockInfo:', error);
    throw error;
  }
};
