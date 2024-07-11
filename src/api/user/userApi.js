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
  getUserExchangeLinkAccount(data) {
    const url = "/users/exchange/link-account";
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccount(data) {
    const url = "/users/exchange/link-account";
    return axiosClient.post(url, data);
  },
  userExchangeMoveBoUsdt(data) {
    const url = "/users/exchange/link-account/move-bo-usdt";
    return axiosClient.post(url, data);
  },
  userExchangeMoveUsdtBo(data) {
    const url = "/users/exchange/link-account/move-bo-usdt";
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountResetDemo(data) {
    const url = "/users/exchange/link-account/reset-demo";
    return axiosClient.put(url, data);
  },
  userExchangeSpotBalance(data) {
    const url = "/users/exchange/spot-balance";
    return axiosClient.get(url, data);
  },
  getUserExchangeLinkAccountAddress(data) {
    const url = "/users/exchange/link-account/address";
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountAddress(data) {
    const url = "/users/exchange/link-account/address";
    return axiosClient.post(url, data);
  },
  getUserExchangeLinkAccountTransactionsBalance(data) {
    const url = "/users/exchange/link-account/transactions/balance";
    return axiosClient.get(url, data);
  },
  getUserExchangeLinkAccountSpotWalletTransactions(data) {
    const url = "/users/exchange/link-account/spot-wallet-transactions";
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountMoveBoUsdt(data) {
    const url = "/users/exchange/link-account/move-bo-usdt";
    return axiosClient.post(url, data);
  },
  postUserExchangeLinkAccountMoveUsdtBo(data) {
    const url = "/users/exchange/link-account/move-usdt-bo";
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountWithdraw(data) {
    const url = "/users/exchange/link-account/withdraw";
    return axiosClient.post(url, data);
  },
  userExchangeLinkAccountTransfer(data) {
    const url = "/users/exchange/link-account/transfer";
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
  getUsersExchangeLinkAccountDailyTarget(data) {
    const url = `/users/exchange/link-account/daily-target`;
    return axiosClient.get(url, data);
  },
  postUserExchangeLinkAccountDailyTarget(data) {
    const url = `/users/exchange/link-account/daily-target`;
    return axiosClient.post(url, data);
  },
};

export default userApi;
