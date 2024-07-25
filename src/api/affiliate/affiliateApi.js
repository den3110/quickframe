import axiosClient from '../axiosClient';

const affiliateApi = {
    userExchangeLinkAccountAffiliate(data) {
        const url= `/users/exchange/link-account/affiliate`
        return axiosClient.get(url, data)
    }
};

export default affiliateApi;