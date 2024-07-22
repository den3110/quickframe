import axiosClient from "../axiosClient";

const exchangeApi = {
  userExchangeLinkAccount2Fa(data) {
    const url = "/users/exchange/link-account-2fa";
    return axiosClient.post(url, data);
  },
  userBotLeaderboard(data) {
    const url = "/users/bot/leaderboard";
    return axiosClient.get(url, data);
  },
  userExchangeLinkAccountLeaderboard(data){ 
    const url= "/users/exchange/link-account/leaderboard"
    return axiosClient.get(url, data)
  },
  userExchangeLinkAccountLogout(data, linkAccountId) {
    const url= "/users/exchange/link-account/logout/" + linkAccountId
    return axiosClient.put(url, data)
  },
  usersExchangeLinkAccountInfo(data, linkAccountId) {
    const url= "/users/exchange/link-account/info/" + linkAccountId
    return axiosClient.get(url, data)
  }
};
// cho e ti
export default exchangeApi;
