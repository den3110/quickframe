import axiosClient from '../axiosClient';

const affiliateApi = {
    userExchangeLinkAccountAffiliate(data, linkAccountId) {
        const url= `/users/exchange/link-account/affiliate/` + linkAccountId
        return axiosClient.get(url, data)
    },
    userExchangeLinkAccountOverview(data, linkAccountId) {
        const url= `/users/exchange/link-account/overview/` + linkAccountId
        return axiosClient.get(url, data)
    },
    userExchangeLinkAccountScanActiveF1s(id, data) {
        const url= `/users/exchange/link-account/scan-active-f1s/` + id
        return axiosClient.put(url, data)
    },
    userExchangeLinkAccountActiveMarketing(data, id) {
        const url= `/users/exchange/link-account/active-marketing/` + id
        return axiosClient.post(url, data)
    },
    userExchangeLinkAccountActiveNormal(data, id) {
        const url= `/users/exchange/link-account/active-normal/` + id
        return axiosClient.post(url, data)
    },
    userExchangeLinkAccountActiveList(id, data) {
        const url= `/users/exchange/link-account/active-list/` + id
        return axiosClient.get(url, data)
    }
};

export default affiliateApi;