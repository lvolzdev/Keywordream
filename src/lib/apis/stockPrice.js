import instance from "./baseApi";

// 종목 코드로 현재가 가져오기
export const fetchStockPrice = async (stockCode) => {
  try {
    const response = await instance.get(`/main/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stockInfo:', error);
    throw error;
  }
};
