import { legacy_createStore as createStore, combineReducers } from "redux";
import dataLoginReducer from "./reducer/DataLoginReducer";

const reducer = combineReducers({
    dataLogin: dataLoginReducer,
});

const store = createStore(reducer);

export default store;
