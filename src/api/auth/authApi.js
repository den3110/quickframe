import axiosClient from '../axiosClient';

const authApi = {
    login(data) {
        const url = '/auth/token';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },
    refreshToken(data) {
        const url = '/auth/refresh-token';
        return axiosClient.post(url, data);
    },
    logout() {
        const url = '/auth/logout';
        return axiosClient.post(url);
    },
    requestOtpCode(data) {
        const url= "/auth/request-code"
        return axiosClient.post(url, data)
    },
    forgetPassword(data) {
        const url= "/auth/forgot-password"
        return axiosClient.post(url, data)
    }
};

export default authApi;