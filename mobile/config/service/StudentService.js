import HandleApi from "../api/HandleAPI";

const getPupils = async () => {
    return await HandleApi.APIGetWithToken("pupil/");
};

const deletePupilById = async (id) => {
    return await HandleApi.APIDelete(`pupil/${id}`);
};

const getPupilById = async (id) => {
    return await HandleApi.APIGetWithToken(`pupil/${id}`);
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

const PupilService = {
    getPupils,
    deletePupilById,
    getPupilById,
    getPupilByParentId,
    getStudentByTeacherIdAtTeacherRole,
    getStudentByStudentId,
};

export default PupilService;
