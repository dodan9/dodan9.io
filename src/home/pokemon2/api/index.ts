import axios from "axios";

const rootApi = "https://pokeapi.co/api/v2";

const getApi = (quary: string, number?: string) => {
  return axios({
    url: `${rootApi}/${quary}/${number}`,
    method: "get",
  });
};
export const getRegionApi = (regionNumber: string) => {
  return getApi("region", regionNumber);
};

export const getLocationApi = (locationNumber: string) => {
  return getApi("location", locationNumber);
};
