import instance from "./baseApi";

// 종목 코드로 현재가와 종목명 가져오기
export const fetchStockInfo = async (stockCode) => {
  try {
    const response = await instance.get(`/stockInfo/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stockInfo:', error);
    throw error;
  }
};
