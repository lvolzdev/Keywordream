import instance from "./baseApi";

export const getFinStat = async () => {
  const { data } = await instance.get("/stock/info");

  return data;
};
