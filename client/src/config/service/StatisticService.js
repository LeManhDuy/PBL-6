import HandleApi from "../api/HandleAPI";

const getCommentByClassId = async (id) => {
    return await HandleApi.APIGetWithToken(`statistic/get-comment-by-class-id/${id}`)
}

const getStaticCommentPupilByClassId = async (id, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-static-comment-pupil-by-class-id/${id}&${label}`)
}

const getScoreByClassSubjectId = async (classID, subjectID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-by-class-subject-id/${classID}&${subjectID}`)
}

const getScorePupilByClassSubjectId = async (classID, subjectID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-pupil-by-class-subject-id/${classID}&${subjectID}&${label}`)
}

const getCommentByGradeId = async (id) => {
    return await HandleApi.APIGetWithToken(`statistic/get-comment-by-grade-id/${id}`)
}

const getCommentPupilByGradeId = async (id, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-comment-pupil-by-grade-id/${id}&${label}`)
}

const getCommentByGradeSubjectId = async (gradeID, subjectID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-by-grade-subjcet-id/${gradeID}&${subjectID}`)
}

const getCommentPupilByGradeSubjectId = async (gradeID, subjectID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-pupil-by-grade-subjcet-id/${gradeID}&${subjectID}&${label}`)
}

const getFeeByFeeCategoryAndClassId = async (feeCategoryID, classID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-and-class-id/${feeCategoryID}&${classID}`)
}

const getFeePupilByFeeCategoryAndClassId = async (feeCategoryID, classID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil-by-fee-category-and-class-id/${feeCategoryID}&${classID}&${label}`)
}

const getFeeByClassId = async (classID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-class-id/${classID}`)
}

const getFeePupilByClassId = async (classID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil-by-class-id/${classID}&${label}`)
}

const getFeeByFeeCategoryAndGradeId = async (feeCategoryID, gradeID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-and-grade-id/${feeCategoryID}&${gradeID}`)
}

const getFeePupilByFeeCategoryAndGradeId = async (feeCategoryID, gradeID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil-by-fee-category-and-grade-id/${feeCategoryID}&${gradeID}&${label}`)
}

const getFeeByGradeId = async (gradeID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-grade-id/${gradeID}`)
}

const getFeePupilByGradeId = async (gradeID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil-by-grade-id/${gradeID}&${label}`)
}

const getFeeByFeeCategoryId = async (feeCategoryID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-id/${feeCategoryID}`)
}

const getFeePupilByFeeCategoryId = async (feeCategoryID, label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil-by-fee-category-id/${feeCategoryID}&${label}`)
}

const getFee = async () => {
    return await HandleApi.APIGetWithToken("statistic/get-fee");
};

const getFeePupil = async (label) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-pupil/${label}`);
};

const StatisticService = {
    getCommentByClassId,
    getStaticCommentPupilByClassId,
    getScoreByClassSubjectId,
    getScorePupilByClassSubjectId,
    getCommentByGradeId,
    getCommentPupilByGradeId,
    getCommentByGradeSubjectId,
    getCommentPupilByGradeSubjectId,
    getFeeByFeeCategoryAndClassId,
    getFeePupilByFeeCategoryAndClassId,
    getFeeByClassId,
    getFeePupilByClassId,
    getFeeByFeeCategoryAndGradeId,
    getFeePupilByFeeCategoryAndGradeId,
    getFeeByGradeId,
    getFeePupilByGradeId,
    getFeeByFeeCategoryId,
    getFeePupilByFeeCategoryId,
    getFee,
    getFeePupil
};

export default StatisticService;
