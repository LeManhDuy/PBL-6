let dataLogin = {};
const dataLoginReducer = (state = dataLogin, action) => {
    if (action.type === "setDataLogin") return action.data;
    return state;
};
export default dataLoginReducer;
