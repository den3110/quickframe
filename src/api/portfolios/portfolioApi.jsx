import axiosClient from "../axiosClient";

const portfolioApi = {
  usersBotCreate(data) {
    const url= "/users/bot/create"
    return axiosClient.post(url, data)
  }
};

export default portfolioApi;
