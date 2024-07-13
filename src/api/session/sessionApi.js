import axiosClient from "../axiosClient";

const sessionApi = {
  getGlobalLastResults(data){ 
    const url= "/globals/last-results"
    return axiosClient.get(url, data)
  },
};

export default sessionApi;
