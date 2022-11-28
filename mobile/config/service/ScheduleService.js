import HandleApi from "../api/HandleAPI";

const getSchedule = async () => {
    return await HandleApi.APIGetWithToken("schedule/");
};

const getScheduleByHomeRoomTeacher = async (id) =>{
    return await HandleApi.APIGetWithToken(`schedule/home-room-teacher/${id}`)
}

const getScheduleByPupilID = async (id) =>{
    return await HandleApi.APIGetWithToken(`schedule/pupil/${id}`)
} 

const AddScheduleByFile = async (file) => {
    return await HandleApi.APIPostWithTokenFile("schedule/",file)
}
const DeleteScheduleById = async (id) =>{
    return await HandleApi.APIDelete(`schedule/${id}`)
}

const ScheduleService = {
    getSchedule,
    getScheduleByHomeRoomTeacher,
    getScheduleByPupilID,
    AddScheduleByFile,
    DeleteScheduleById
};

export default ScheduleService;
