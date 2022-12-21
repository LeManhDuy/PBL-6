import HandleApi from "../api/HandleAPI";


const getCommentByPupilID = async (id) => {
    return await HandleApi.APIGetWithToken(`comment/${id}`);
};

const CommentService = {
    getCommentByPupilID,
};

export default CommentService;
