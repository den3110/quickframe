import axiosClient from "../axiosClient";

const signalStrategyApi = {
  userBudgetSignalCreate(data){ 
    const url= "/users/budget-signal/create"
    return axiosClient.post(url, data)
  },
  
};

export default signalStrategyApi;
