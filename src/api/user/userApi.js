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
    }
    
};

export default userApi;