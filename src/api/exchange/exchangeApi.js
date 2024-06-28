import axiosClient from '../axiosClient';

const exchangeApi = {
    userExchangeLinkAccount2Fa(data) {
        const url= "/users/exchange/link-account-2fa"
        return axiosClient.post(url, data)
    }    
};

export default exchangeApi;