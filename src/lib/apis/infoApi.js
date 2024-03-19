import instance from "./baseApi";

export const getFinStat = async () => {
  const { data } = await instance.get("/finstat/info");

  return data;
};
