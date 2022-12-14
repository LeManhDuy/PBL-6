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

const getAllScoreOfPupilByClassID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-all-score/${id}`);
};

const getSubjectByClassID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-all-subject/${id}`);
};

const ScoreService = {
    getSubjectByPupilID,
    createSubjectScore,
    getAllScoreByPupilID,
    updateScoreByID,
    getScoreByID,
    getAllScoreOfPupilByClassID,
    getSubjectByClassID,
};

export default ScoreService;
