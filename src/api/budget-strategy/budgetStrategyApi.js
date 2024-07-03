import axiosClient from "../axiosClient";

const budgetStrategyApi = {
  userBudgetStrategyList(data){ 
    const url= "/users/budget-strategy/list"
    return axiosClient.get(url, data)
  }
};

export default budgetStrategyApi;
