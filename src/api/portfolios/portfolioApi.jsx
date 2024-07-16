import axiosClient from "../axiosClient";

const portfolioApi = {
  usersBotCreate(data) {
    const url= "/users/bot/create"
    return axiosClient.post(url, data)
  },
  userBotList(data) {
    const url= "/users/bot/list"
    return axiosClient.get(url, data)
  },
  userBotAction(id, data) {
    const url= `/users/bot/action/${id}`
    return axiosClient.post(url, data)
  },
  userBotUpdate(id, data) {
    const url= `/users/bot/update/${id}`
    return axiosClient.post(url, data)
  },
  userBotTotal(data) {
    const url= `/users/bot/total`
    return axiosClient.get(url, data)
  },
  userBotHistory(id, data) {
    const url= `/users/bot/history/${id}`
    return axiosClient.get(url, data)
  },
  userBotInfo(id, data) {
    const url= `/users/bot/info/${id}`
    return axiosClient.get(url, data)
  }
};  

export default portfolioApi;