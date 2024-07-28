import axiosClient from '../axiosClient';

const notificationApi = {
    getUserNotification(data) {
        const url= `/users/notifications`
        return axiosClient.get(url, data)
    }
};

export default notificationApi;