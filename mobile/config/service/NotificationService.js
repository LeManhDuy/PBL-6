import HandleApi from "../api/HandleAPI";

const getNotifications = async () => {
    return await HandleApi.APIGetWithToken(`notification`);
};

const getNotificationsParents = async (id) => {
    return await HandleApi.APIGetWithToken(
        `notification/private/parents/${id}`
    );
};

const getNotificationsTeacher = async (id) => {
    return await HandleApi.APIGetWithToken(`notification/private/${id}`);
};

const getNotificationsById = async (id) => {
    return await HandleApi.APIGetWithToken(`notification/${id}`);
};

const getPrivateNotificationsById = async (id) => {
    return await HandleApi.APIGetWithToken(
        `notification/private/get-by-id/${id}`
    );
};

const createPrivateNotification = async (params) => {
    return await HandleApi.APIPostWithToken(`notification/private`, params);
};

const deletePublicNotification = async (id) => {
    return await HandleApi.APIDelete(`notification/${id}`);
};

const deletePrivateNotification = async (id) => {
    return await HandleApi.APIDelete(`notification/private/${id}`);
};

const NotificationService = {
    getNotifications,
    getNotificationsParents,
    getNotificationsTeacher,
    getNotificationsById,
    createPrivateNotification,
    deletePublicNotification,
    deletePrivateNotification,
    getPrivateNotificationsById,
};

export default NotificationService;
