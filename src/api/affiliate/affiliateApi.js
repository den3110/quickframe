import axiosClient from '../axiosClient';

const affiliateApi = {
    userExchangeLinkAccountAffiliate(data, linkAccountId) {
        const url= `/users/exchange/link-account/affiliate/` + linkAccountId
        return axiosClient.get(url, data)
    },
    userExchangeLinkAccountOverview(data, linkAccountId) {
        const url= `/users/exchange/link-account/overview/` + linkAccountId
        return axiosClient.get(url, data)
    }
};

export default affiliateApi;