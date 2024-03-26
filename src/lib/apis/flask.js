import instance from "./baseApi";

export const crawlExtractKeyword = async (stockName, stockCode) => {
  try {
      const response = await instance.post("/flask/news", {
          name : stockName,
          code : stockCode
      })
      return response
    } catch (error) {
      console.error('Error crawling and extract keyowrd : ', error);
      throw error;
    }
};

export const getSentimentResult = async (newsId) => {
  try{
    const response = await instance.post("/flask/krFinBert", {
      newsId : newsId,
    })
    return response
  } catch(error){
    console.error("Error news sentiment analysis : ", error)
    throw error
  }
}
