import instance from "./baseApi";

// 닉네임에 해당하는 관심종목 가져오기
export const fetchMyStock = async (nickName) => {
  try {
    const response = await instance.post(`/mypage`, {nickName: nickName});
    return response.data;
  } catch (error) {
    console.error('Error fetching stockInfo:', error);
  }
};
