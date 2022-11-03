import HandleApi from "../api/HandleAPI";

const getSchedule = async () => {
    return await HandleApi.APIGetWithToken("schedule/");
};

const AddScheduleByFile = async (file) => {
    return await HandleApi.APIPostWithTokenFile("schedule/",file)
}
const DeleteScheduleById = async (id) =>{
    return await HandleApi.APIDelete(`schedule/${id}`)
}

const ScheduleService = {
    getSchedule,
    AddScheduleByFile,
    DeleteScheduleById
};

export default ScheduleService;
