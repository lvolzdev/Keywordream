import axios from 'axios';
const apiKey_value = process.env.apiKey_value;
const baseURL = 'https://gapi.shinhansec.com:8443/openapi/v1.0/ranking';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'apiKey': apiKey_value
  }
});

// 거래량순
export const fetchMostExchanged = async () => {
  try {
    const response = await axiosInstance.get('/issue', {
      params: {
        query_type: 1
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most exchanged:', error);
    throw error;
  }
};

// 주가상승순
export const fetchMostIncreased = async () => {
  try {
    const response = await axiosInstance.get('/issue', {
      params: {
        query_type: 2
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most increased:', error);
    throw error;
  }
};

// 조회수순
export const fetchMostViewed = async () => {
  try {
    const response = await axiosInstance.get('/rising');
    return response.data;
  } catch (error) {
    console.error('Error fetching most viewed:', error);
    throw error;
  }
};