import { combineReducers } from "redux";
import Reducer from "./Auth/reducer";
import ClinicReducer from "./Clinic/ClinicReducer";
import DoctorReducer from "./Doctor/doctorReducer";
// import AdminReducer from './admin/reducer';
const rootReducer = combineReducers({ login: Reducer, clinic: ClinicReducer, doctor: DoctorReducer });

export default rootReducer;
