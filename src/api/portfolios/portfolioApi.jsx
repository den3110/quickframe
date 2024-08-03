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
  userBotActionList(data) {
    const url= `/users/bot/actions`
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
  },
  userBotStatics(id, data) {
    const url= `/users/bot/statics/${id}`
    return axiosClient.get(url, data)
  },
  userExchangeLinkAccounStatics(data, params, linkAccountId) {
    const url= `/users/exchange/link-account/statics/` + linkAccountId 
    return axiosClient.post(url, data, params)
  },
  postUserBotLinkAccount(id, data) {
    const url= `/users/bot/link-account/` + id 
    return axiosClient.post(url, data)
  },
  userScheduleList(data) {
    const url= `/users/schedule/list`
    return axiosClient.get(url, data)
  },
  userScheduleCreate(data) {
    const url= `/users/schedule/create`
    return axiosClient.post(url, data)
  },
  userScheduleUpdate(id, data) {
    const url= `/users/schedule/update/` + id
    return axiosClient.post(url, data)
  },
  userScheduleDelete(id, data) {
    const url= `/users/schedule/delete/` + id
    return axiosClient.delete(url, data)
  },
  getUserBotCopyInfo(id, data) {
    const url= `/users/bot/copy-info/` + id
    return axiosClient.get(url, data)
  },
  postUserBotCopyInfo(id , data){
    const url= `/users/bot/copy-info/` + id
    return axiosClient.post(url, data)
  }
};  

export default portfolioApi;
