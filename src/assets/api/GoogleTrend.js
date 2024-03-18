
import axios from 'axios';

const baseURL = 'http://localhost:3003/api';
const axiosInstance = axios.create({
  baseURL,
});

// 핫토픽 3개 가져오기
export const getTrends = async () => {
  try {
    const response = await axiosInstance.get('/main/hot');
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topic:', error);
    throw error;
  }
};
