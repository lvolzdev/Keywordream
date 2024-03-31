import instance from "./baseApi";

export async function getKeyword(stockCode){
    return await instance.get(`/keyword/${stockCode}`);
};
