import axiosClient from '../axiosClient';

const jackpotApi = {
    getUserJackpotWinningHistory(id, data) {
        const url= `/users/jackpot/winning_history/${id}`
        return axiosClient.get(url, data)
    },
    getCodeClaim2FA(id, data) {
        const url= `/users/jackpot/claim-2fa/${id}`
        return axiosClient.get(url, data)
    },
    postUserJackpotClaim(id, data) {
        const url= `/users/jackpot/claim/${id}`
        return axiosClient.post(url, data)
    }
};

export default jackpotApi;