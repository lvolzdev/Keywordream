import instance from "./baseApi";

export const getDailyStock = async () => {
  const { data } = await instance.get("/stock/day");

  return data;
};
