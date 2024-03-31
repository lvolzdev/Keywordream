import instance from "./baseApi";

export const getNewsList = async (stockCode) => {
    try {
        const {data} = await instance.post("/news/list", {
            stockCode : stockCode
        })
        return data;
      } catch (error) {
        console.error('Error fetching news list:', error);
        throw error;
      }
};

export const getKeywordNewsList = async (stockCode, keyword) => {
    try {
        const {data} = await instance.post("/news/keywordList", {
            stockCode : stockCode,
            keyword : keyword
        })
        return data;
      } catch (error) {
        console.error('Error keyword fetching news list:', error);
        throw error;
      }
};

export const getNewsTagTop3 = async (stockCode) => {
    try{
        const {data} = await instance.post("/news/tags", {
            stockCode : stockCode
        })
        return data
    } catch (error) {
        console.error('Error fetching news tagTop3: ', error);
        throw error;
    }
}

export const getNewsDetail = async (stockCode, newsId) => {
    try{
        const {data} = await instance.post("/news/detail", {
            stockCode : stockCode,
            newsId : newsId
        })
        return data
    } catch (error) {
        console.error('Error fetching news tagTop3: ', error);
        throw error;
    }
}