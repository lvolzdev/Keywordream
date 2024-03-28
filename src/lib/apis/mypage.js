import instance from "./baseApi";

// 닉네임에 해당하는 관심종목 가져오기
export const fetchMyStock = async (nickName) => {
  try {
    const response = await instance.post(`/mypage/fetch`, {nickName: nickName});
    return response.data;
  } catch (error) {
    console.error('Error fetching stockInfo:', error);
  }
};

// 관심종목 추가
export const addMyStock = async (nickName, stockCode) => {
  try {
    const response = await instance.post(`/mypage/add`, {nickName, stockCode});
    return response.data;
  } catch (error) {
    console.error('Error adding stockInfo:', error);
  }
};

// 관심종목 삭제
export const deleteMyStock = async (nickName, stockCode) => {
  try {
    const response = await instance.post('/mypage/delete', {nickName, stockCode});
    return response.data;
  } catch (error) {
    console.error('Error deleting stockInfo:', error);
  }
};
