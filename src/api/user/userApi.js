import axiosClient from "../axiosClient";


const userApi = {
  getUserProfile(data) {
    const url = "/users/profile";
    return axiosClient.get(url, data);
  },
  getUserExchangeList(data) {
    const url = "/users/exchange/list";
    return axiosClient.post(url, data);
  },
  getUserExchangeLinkAccount(data, linkAccountId) {
    console.log(localStorage.getItem("account"))
    const url = "/users/exchange/link-account/profile/" + linkAccountId;
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccount(data) {
    const url = "/users/exchange/link-account";
    return axiosClient.post(url, data);
  },
  userExchangeMoveBoUsdt(data, linkAccountId) {
    const url = "/users/exchange/link-account/move-bo-usdt/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  userExchangeMoveUsdtBo(data, linkAccountId) {
    const url = "/users/exchange/link-account/move-bo-usdt/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountResetDemo(data, linkAccountId) {
    const url = "/users/exchange/link-account/reset-demo/" + linkAccountId;
    return axiosClient.put(url, data);
  },
  userExchangeSpotBalance(data, linkAccountId) {
    const url = "/users/exchange/spot-balance/" + linkAccountId;
    return axiosClient.get(url, data);
  },
  getUserExchangeLinkAccountAddress(data, linkAccountId) {
    const url = "/users/exchange/link-account/address/" + linkAccountId;
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountAddress(data, linkAccountId) {
    const url = "/users/exchange/link-account/address/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  getUserExchangeLinkAccountTransactionsBalance(data, linkAccountId) {
    const url = "/users/exchange/link-account/transactions/balance/" + linkAccountId;
    return axiosClient.get(url, data);
  },
  getUserExchangeLinkAccountSpotWalletTransactions(data, linkAccountId) {
    const url = "/users/exchange/link-account/spot-wallet-transactions/" + linkAccountId;
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountMoveBoUsdt(data, linkAccountId) {
    const url = "/users/exchange/link-account/move-bo-usdt/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  postUserExchangeLinkAccountMoveUsdtBo(data, linkAccountId) {
    const url = "/users/exchange/link-account/move-usdt-bo/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountWithdraw(data, linkAccountId) {
    const url = "/users/exchange/link-account/withdraw/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountTransfer(data, linkAccountId) {
    const url = "/users/exchange/link-account/transfer/" + linkAccountId;
    return axiosClient.post(url, data);
  },
  usersUploadAvatar(data, options) {
    const url = "/users/upload-avatar";
    return axiosClient.post(url, data, options);
  },
  userGetAvatarToken(token, data) {
    const url = `/users/avatar/${token}`;
    return axiosClient.get(url, data);
  },
  getUsersExchangeLinkAccountDailyTarget(data, linkAccountId) {
    const url = `/users/exchange/link-account/daily-target/` + linkAccountId;
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountDailyTarget(data, linkAccountId) {
    const url = `/users/exchange/link-account/daily-target/` + linkAccountId;
    return axiosClient.post(url, data);
  },
  getUserLinkAccountList(data) {
    const url= `/users/exchange/link-account/list`
    return axiosClient.get(url, data)
  }
};

export default userApi;
