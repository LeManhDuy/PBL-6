import HandleApi from "../api/HandleAPI";

const getSubjectByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/${id}`);
};

const getAllScoreByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-score/${id}`);
};

const getScoreByID = async (id) => {
    return await HandleApi.APIGetWithToken(`score/get-detail-score/${id}`);
};

const ScoreService = {
    getSubjectByPupilID,
    getAllScoreByPupilID,
    getScoreByID,
};

export default ScoreService;
