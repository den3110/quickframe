import axiosClient from "../axiosClient";

const settingsApi = {
  getMaintainanceState(data) {
    const url= "/users/bot/create"
    return axiosClient.post(url, data)
  },
};  

export default settingsApi;
