import { authreducer as auth } from "../reducer/authReducer";
import { ProgramsReducer as programs } from "../reducer/programreducer";
import { activityReducer as activities } from "../reducer/activityReducer";
import { AdminReducer as admins } from "../reducer/adminReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';

const reducers = combineReducers({
    auth,
    programs,
    activities,
    admins
})

let middleware = [thunk];

export default createStore(reducers, {}, applyMiddleware(...middleware));