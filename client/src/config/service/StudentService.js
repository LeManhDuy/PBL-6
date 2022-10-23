import HandleApi from "../api/HandleAPI";

const getPupils = async () => {
    return await HandleApi.APIGetWithToken("pupil/");
};

const addPupil = async (classID, parentID, params) => {
    return await HandleApi.APIPostWithTokenIMG(
        `pupil/${classID}&${parentID}`,
        params
    );
};

const deletePupilById = async (id) => {
    return await HandleApi.APIDelete(`pupil/${id}`);
};

const getPupilById = async (id) => {
    return await HandleApi.APIGetWithToken(`pupil/${id}`);
};

const updatePupil = async (pupilID, params) => {
    return await HandleApi.APIPutWithTokenIMG(
        `pupil/${pupilID}`,
        params
    );
};

const PupilService = {
    getPupils,
    addPupil,
    deletePupilById,
    getPupilById,
    updatePupil
};

export default PupilService;
