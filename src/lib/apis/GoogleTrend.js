import instance from "./baseApi";

// 핫토픽 3개 가져오기
export const getTrends = async () => {
  try {
    const response = await instance.get('/main/hot');
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topic:', error);
    throw error;
  }
};
