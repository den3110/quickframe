import axiosClient from "../axiosClient";

const copytradeApi = {
  postUserCopytrade(data) {
    const url = "/users/copy-trade/trade";
    return axiosClient.post(url, data);
  },
  userCopytradeHistory(data) {
    const url= "/users/copy-trade/history"
    return axiosClient.get(url, data)
  },
  userCopytradeStaticstic(data) {
    const url= "/users/copy-trade/statics"
    return axiosClient.get(url, data)
  }

};

export default copytradeApi;
