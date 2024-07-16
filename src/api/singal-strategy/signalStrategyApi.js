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
  }
  
};

export default signalStrategyApi;
