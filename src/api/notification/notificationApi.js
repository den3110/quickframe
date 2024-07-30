import axiosClient from '../axiosClient';

const notificationApi = {
    getUserNotification(data) {
        const url= `/users/notifications`
        return axiosClient.get(url, data)
    },
    userReadNotification(id, data) {
        const url= `/users/notifications/read/` +  id
        return axiosClient.put(url, data)
    },
    userReadAllNotification(data) {
        const url= `/users/notifications/read-all`
        return axiosClient.put(url, data)
    }
};

export default notificationApi;