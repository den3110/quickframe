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
  },
  userCopytradeFollower(data) {
    const url= "/users/copy-trade/followers"
    return axiosClient.get(url, data)
  },
  postUserCopytradeBlock(data) {
    const url= "/users/copy-trade/block"
    return axiosClient.post(url, data)
  },
  postUserCopytradeUnblock(data) {
    const url= "/users/copy-trade/unblock"
    return axiosClient.delete(url, data)
  },
  getUserCopytradeFollowerPlan(data) {
    const url= `/users/copy-trade/follower/plans`
    return axiosClient.get(url, data)
  }

};

export default copytradeApi;
