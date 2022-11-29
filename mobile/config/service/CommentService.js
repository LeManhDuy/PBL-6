import HandleApi from "../api/HandleAPI";

const createPupilComment = async (id) => {
    return await HandleApi.APIPostWithToken(`comment/${id}`);
};

const getCommentByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`comment/${id}`);
};

const CommentService = {
    createPupilComment,
    getCommentByPupilID,
};

export default CommentService;
