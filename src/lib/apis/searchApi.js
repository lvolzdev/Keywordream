import instance from "./baseApi";

export async function searchStock(page, code = null, name = null){
    if(code){
        return await instance.get(`/search?page=${page}&code=${code}`)
    } else if(name){
        return await instance.get(`/search?page=${page}&name=${name}`)
    } else {
        return await instance.get(`/search?page=${page}`)
    }
}

export async function allStock(page){
    return await instance.get(`/search/all?page=${page}`);
}

export async function countStock(code = null, name = null){
    if(code){
        return await instance.get(`/search/count?code=${code}`)
    } else if(name){
        return await instance.get(`/search/count?name=${name}`)
    } else {
        return await instance.get(`/search/count`)
    }
}