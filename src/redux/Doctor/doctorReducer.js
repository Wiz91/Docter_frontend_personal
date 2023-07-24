import { toast } from "react-toastify";
import {
  GET_DOCTOR_DASHBOARD_DATA_REQUEST,
  GET_DOCTOR_DASHBOARD_DATA_SUCCESS,
  GET_DOCTOR_LIST_REQUEST,
  GET_DOCTOR_LIST_SUCCESS,
  ADD_NEW_DOCTOR_REQUEST,
  ADD_NEW_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  GET_DOCTOR_PROFILE_REQUEST,
  GET_DOCTOR_PROFILE_SUCCESS,
  GET_DOCTOR_APPOINTMENT_REQUEST,
  GET_DOCTOR_APPOINTMENT_SUCCESS,
  GET_DOCTOR_SELF_APPOINTMENT_REQUEST,
  GET_DOCTOR_SELF_APPOINTMENT_SUCCESS,
  UPDATE_DOCTOR_SELF_PROFILE_REQUEST,
  UPDATE_DOCTOR_SELF_PROFILE_SUCCESS,
  GET_DOCTOR_SELF_PATIENT_REQUEST,
  GET_DOCTOR_SELF_PATIENT_SUCCESS,
  GET_DOCTOR_SELF_PROFILE_REQUEST,
  GET_DOCTOR_SELF_PROFILE_SUCCESS,
  CLINIC_SERVER_ERROR,
} from "./doctorConstant";
import { Dashboard } from "@mui/icons-material";


let allDoctor = [{}];


let DashBoardsData = [
  {
    title: "Total Fixed Appointments",
    value: 100
  },
  {
    title: "Total Pending Appointments",
    value: 100
  },
  {
    title: "Total Cancelled Appointments",
    value: 100
  },
  {
    title: "Total Fixed Appointments",
    value: 100
  },
  {
    title: "Total Pending Appointments",
    value: 100
  },
  {
    title: "Total Cancelled Appointments",
    value: 100
  }
];

const initialState = {
  allDoctor: [],
  DashboardState: DashBoardsData
};

const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTOR_DASHBOARD_DATA_REQUEST:
      return { loading: true };
    case GET_DOCTOR_DASHBOARD_DATA_SUCCESS:
      return { doctorDashboard: action.payload };
    case GET_DOCTOR_LIST_REQUEST:
      return { loading: true };
    case GET_DOCTOR_LIST_SUCCESS:
      return { DoctorList: action.payload.results };  
    case DELETE_DOCTOR_SUCCESS:
      toast.success("Doctor Deleted")
      return { loading: false, deldoc:true }   
    case GET_DOCTOR_SELF_APPOINTMENT_REQUEST:
       return { loading: true};
    case GET_DOCTOR_SELF_APPOINTMENT_SUCCESS: 
      return { doctorSelf: action.payload };
    case GET_DOCTOR_SELF_PROFILE_REQUEST:
      return { loading: true};
    case GET_DOCTOR_SELF_PROFILE_SUCCESS: 
      return { doctorPersonal: action.payload };
    case UPDATE_DOCTOR_SELF_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_DOCTOR_SELF_PROFILE_SUCCESS:
      toast.success("Update Sucecssfully");
      return { loading: false, upprofile: true };
    case ADD_NEW_DOCTOR_REQUEST:
      return { loading: true };
    case ADD_NEW_DOCTOR_SUCCESS:
      toast.success("Add Successfully");
      return { status:action.payload.status,loading: false, adddoc:true }; // add boolean for dialog loader.
    case GET_DOCTOR_SELF_PATIENT_REQUEST:
      return { loading: true};
    case GET_DOCTOR_SELF_PATIENT_SUCCESS: 
      return { PatientSelfList: action.payload };
    case UPDATE_DOCTOR_REQUEST:
      return { loading: true };
    case UPDATE_DOCTOR_SUCCESS:
      toast.success("Update Successfully");
      return { loading: false, updoc:true };    // add boolean for dialog loader.
    case CLINIC_SERVER_ERROR:
      // console.log(action.payload.message,"work")
      // if(action.payload.message==="email user account with this email already exists"){
      //   toast.error("user account with this email already exists")
      // }  
      // toast.error(action.payload.message);
      return { loading: false, derror: true };
    default:
      return state;
  }
};

export default DoctorReducer;
