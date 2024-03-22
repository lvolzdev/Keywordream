import instance from "./baseApi";

export async function searchStock(stockCode, name){
    if(stockCode){ return await instance.get(`/search?code=${stockCode}`)}
    else if(name) {return await instance.get(`/search?name=${name}`)}
}

export async function allStock(){
    return await instance.get('/search/all');
}