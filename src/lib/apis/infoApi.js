import instance from "./baseApi";

export const getFinStat = async (stockCode) => {
  const { data } = await instance.get(`/finstat/${stockCode}/info`);

  return data;
};
