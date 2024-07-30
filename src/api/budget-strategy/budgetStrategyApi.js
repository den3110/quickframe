import axiosClient from "../axiosClient";

const budgetStrategyApi = {
  userBudgetStrategyList(data){ 
    const url= "/users/budget-strategy/list"
    return axiosClient.get(url, data)
  },
  userBudgetStrategyCreate(data) { 
    const url= "/users/budget-strategy/create"
    return axiosClient.post(url, data)
  },
  userBudgetStrategyUpdate(id, data) {
    const url= `/users/budget-strategy/update/${id}`
    return axiosClient.post(url, data)
  },
  userBudgetStrategyDelete(id, data) {
    const url= `/users/budget-strategy/delete/${id}`
    return axiosClient.delete(url, data)
  },
  userBudgetStrategyGenerateShareCode(id, data) {
    const url= `/users/budget-strategy/generate-share-code/` + id
    return axiosClient.put(url, data)
  },
  userBudgetStrategyCopy(id, data) {
    const url= `/users/budget-strategy/copy/` + id
    return axiosClient.post(url, data)
  }
};

export default budgetStrategyApi;
