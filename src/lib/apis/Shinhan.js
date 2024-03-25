import instance from "./baseApi";

// 서버로부터 신한투자증권 선정 조회순, 상승순, 거래순 가져오기
export const fetchMostViewed = async () => {
  try {
    const response = await instance.get('/main/most-viewed');
    return response.data;
  } catch (error) {
    console.error('Error fetching most viewed:', error);
    throw error;
  }
};

export const fetchMostIncreased = async () => {
  try {
    const response = await instance.get('/main/most-increased');
    return response.data;
  } catch (error) {
    console.error('Error fetching most increased:', error);
    throw error;
  }
};

export const fetchMostExchanged = async () => {
  try {
    const response = await instance.get('/main/most-exchanged');
    return response.data;
  } catch (error) {
    console.error('Error fetching most exchanged:', error);
    throw error;
  }
};

export const getKeywords = async() => {
  try {
    const response = await instance.get('/main/top-keyword');
    return response.data;
  } catch (error) {
    console.error('Error fetching top keywords: ', error);
    throw error;
  }
}
