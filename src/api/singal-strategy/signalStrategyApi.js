import axiosClient from "../axiosClient";

const signalStrategyApi = {
  userBudgetSignalCreate(data){ 
    const url= "/users/budget-signal/create"
    return axiosClient.post(url, data)
  },
  userBudgetSignalList(data) {
    const url= "/users/budget-signal/list"
    return axiosClient.get(url, data)
  },
  userBudgetSignalUpdate(id, data){ 
    const url= `/users/budget-signal/update/${id}`
    return axiosClient.post(url, data)
  },
  userBudgetSignalDelete(id, data){ 
    const url= `/users/budget-signal/delete/${id}`
    return axiosClient.delete(url, data)
  },
  userBudgetTelegramSignal(data) {
    const url= `/users/budget-signal/telegram-signals`
    return axiosClient.get(url, data)
  },
  usersBudgetSignalHistory(id, data) {
    const url= `/users/budget-signal/history/` + id
    return axiosClient.get(url, data)
  },
  userBudgetSignalTeleSignalInfo(id, data) {
    const url= `/users/budget-signal/tele-signal-info/` + id
    return axiosClient.get(url, data)
  },
  userBudgetSignalGenerateShareCode(id, data) {
    const url= `/users/budget-signal/generate-share-code/` + id
    return axiosClient.put(url, data)
  },
  userBudgetSignalCopy(id, data) {
    const url= `/users/budget-signal/copy/` + id
    return axiosClient.post(url, data)
  }
  
};

export default signalStrategyApi;
