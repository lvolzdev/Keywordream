import axios from "axios";

const FLASK_RUL = "http://127.0.0.1:5000/api/news";

export const crawlExtractKeyword = async (stockName, stockCode) => {
    console.log(stockName);
    console.log(stockCode);
    try {
        const response = await axios.post(FLASK_RUL, {
            name : stockName,
            code : stockCode
        })
        return response
      } catch (error) {
        console.error('Error crawling and extract keyowrd : ', error);
        throw error;
      }
};
