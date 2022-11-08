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

const updateScoreByID = async (id) => {
    return await HandleApi.APIPutWithToken(`score/${id}`);
};

const ScoreService = {
    getSubjectByPupilID,
    createSubjectScore,
    getAllScoreByPupilID,
    updateScoreByID,
};

export default ScoreService;
