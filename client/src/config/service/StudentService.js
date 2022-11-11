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

const GetParentsInformation = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/get-parents-info/${id}`);
};

const updatePupil = async (pupilID, params) => {
    return await HandleApi.APIPutWithTokenIMG(`pupil/${pupilID}`, params);
};

const getPupilByParentId = async (personID) => {
    return await HandleApi.APIGetWithToken(
        `pupil/get-pupil-by-parent/${personID}`
    );
};

const getStudentByTeacherIdAtTeacherRole = async (id) => {
    return await HandleApi.APIGetWithToken(`class/get-pupil-at-teacher-role/${id}`);
}

const getStudentByStudentId = async (id) => {
    return await HandleApi.APIGetWithToken(`pupil/${id}`);
}
const AddStudentByFile = async (file) => {
    return await HandleApi.APIPostWithTokenFile("pupil/add-multi-pupil", file)
}
const deleteMultiPupil = async (array_params) => {
    return await HandleApi.APIPostWithToken(`pupil/multi/delete/`, array_params);
};
const PupilService = {
    getPupils,
    addPupil,
    deletePupilById,
    getPupilById,
    updatePupil,
    getPupilByParentId,
    getStudentByTeacherIdAtTeacherRole,
    getStudentByStudentId,
    AddStudentByFile,
    deleteMultiPupil
};

export default PupilService;
