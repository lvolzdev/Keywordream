import instance from "./baseApi";

export const getDailyStock = async (stockCode) => {
  const { data } = await instance.get(`/stock/${stockCode}/day`);

  return data;
};
