import axiosClient from '../axiosClient';

const userApi = {
    getUserProfile(data) {
        const url = '/users/profile';
        return axiosClient.get(url, data);
    },
    getUserExchangeList(data) {
        const url= "/users/exchange/list";
        return axiosClient.post(url, data);
    },
    getUserExchangeLinkAccount(data) {
        const url= "/users/exchange/link-account"
        return axiosClient.get(url, data)
    },
    postUserExchangeLinkAccount(data) {
        const url= "/users/exchange/link-account"
        return axiosClient.post(url, data)
    },
    userExchangeMoveBoUsdt(data) {
        const url= "/users/exchange/link-account/move-bo-usdt"
        return axiosClient.post(url, data)
    },
    userExchangeMoveUsdtBo(data) {
        const url= "/users/exchange/link-account/move-bo-usdt"
        return axiosClient.post(url, data)
    },
    userExchangeLinkAccountResetDemo(data) {
        const url= "/users/exchange/link-account/reset-demo"
        return axiosClient.put(url, data)
    },
    userExchangeSpotBalance(data) {
        const url= "/users/exchange/spot-balance"
        return axiosClient.get(url, data)
    }
    
};

export default userApi;