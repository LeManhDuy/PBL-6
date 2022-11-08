import HandleApi from "../api/HandleAPI";

const getSubjectByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/${id}`);
};

const createSubjectScore = async (id, params) => {
    return await HandleApi.APIPostWithToken(`score/${id}`, params);
};

const getAllScoreByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-score/${id}`);
};

const updateScoreByID = async (id, params) => {
    return await HandleApi.APIPutWithToken(`score/${id}`, params);
};

const getScoreByID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-detail-score/${id}`);
};

const ScoreService = {
    getSubjectByPupilID,
    createSubjectScore,
    getAllScoreByPupilID,
    updateScoreByID,
    getScoreByID,
};

export default ScoreService;
