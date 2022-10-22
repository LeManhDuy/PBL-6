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


const StudentService = {
    getPupils,
    addPupil,
};

export default StudentService;
