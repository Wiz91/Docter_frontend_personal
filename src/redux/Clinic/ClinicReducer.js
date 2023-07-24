import { toast } from "react-toastify";
import {
  ADD_NEW_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  GET_DASHBOARD_DATA_REQUEST,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_STAFF_LIST_REQUEST,
  GET_STAFF_LIST_SUCCESS,
  UPDATE_STAFF_SUCCESS,
  GET_DOCTOR_LIST_REQUEST,
  GET_DOCTOR_LIST_SUCCESS,
  GET_PATIENT_LIST_REQUEST,
  GET_PATIENT_LIST_SUCCESS,
  GET_DOCTOR_AVAILABILITY_LIST_REQUEST,
  GET_DOCTOR_AVAILABILITY_LIST_SUCCESS,
  ADD_NEW_DOCTOR_AVAILABILITY_REQUEST,
  ADD_NEW_DOCTOR_AVAILABILITY_SUCCESS,
  GET_CLINIC_PROFILE_REQUEST,
  GET_CLINIC_PROFILE_SUCCESS,
  ADD_NEW_PATIENT_SUCCESS,
  ADD_NEW_PATIENT_REQUEST,
  ADD_NEW_STAFF_SUCCESS,
  GET_APPOINTMENT_LIST_REQUEST,
  GET_APPOINTMENT_LIST_SUCCESS,
  ADD_NEW_APPOINTMENT_REQUEST,
  ADD_NEW_APPOINTMENT_SUCCESS,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_CLINIC_PROFILE_REQUEST,
  UPDATE_CLINIC_PROFILE_SUCCESS,
  GET_MEDICINE_LIST_REQUEST,
  GET_MEDICINE_LIST_SUCCESS,
  ADD_NEW_MEDICINE_REQUEST,
  ADD_NEW_MEDICINE_SUCCESS,
  UPDATE_STAFF_PROFILE_REQUEST,
  UPDATE_STAFF_PROFILE_SUCCESS,
  GET__NON_AVAILABILITY_REQUEST,
  GET_NON_AVAILABILITY_LIST_SUCCESS,
  ADD_NON_AVAILABILITY_REQUEST,
  ADD_NON_AVAILABILITY_SUCCESS,
  DELETE_NON_AVAILABILITY_REQUEST,
  DELETE_NON_AVAILABILITY_SUCCESS,
  DELETE_STAFF_REQUEST,
  CLINIC_SERVER_ERROR,
} from "./clinicConstant";
import { Dashboard } from "@mui/icons-material";
import { string } from "yup";

let allStaff = [{}];

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
  allStaff: [],
  allDoctor: [],
  DashboardState: DashBoardsData
};

const ClinicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_REQUEST:
      return { loading: true };
    case GET_DASHBOARD_DATA_SUCCESS:
      return { dashboardList: action.payload };
    case GET_STAFF_LIST_REQUEST:
      return { loading: true };
    case GET_STAFF_LIST_SUCCESS:
      return { staffList: action.payload.results };
    case ADD_NEW_STAFF_REQUEST:
      return { loading: true };
    case ADD_NEW_STAFF_SUCCESS:
      toast.success("Staff Added")
      return { loading: false, stfadd: true }
    case DELETE_STAFF_REQUEST:
      return{ loading: true}
    case DELETE_STAFF_SUCCESS:
      toast.success("Staff Deleted")
      return { loading: false, stfdel: true}
    case UPDATE_STAFF_SUCCESS:
      toast.success("Staff Updated")
      return { loading: false, stfupdate: true}   // add boolean for dialog loader.
    case GET_DOCTOR_LIST_REQUEST:
      return { loading: true };
    case GET_DOCTOR_LIST_SUCCESS:
      return { DoctorList: action.payload };  
    case GET_PATIENT_LIST_REQUEST:
        return { loading:false };
    case GET_PATIENT_LIST_SUCCESS:
        console.log(action.payload.results,"inreduser")
        return { PatientList: action.payload.results };
    case GET_DOCTOR_AVAILABILITY_LIST_REQUEST:
      return { loading: true };
    case GET_DOCTOR_AVAILABILITY_LIST_SUCCESS:
      return { doctoravailabilityList: action.payload };
    case ADD_NEW_DOCTOR_AVAILABILITY_REQUEST:
      return { loading: true };
    case ADD_NEW_DOCTOR_AVAILABILITY_SUCCESS:
      toast.success("Doctor Availability Added");
      return { loading: false }; 
    case GET_CLINIC_PROFILE_REQUEST:
      return { loading: true};
    case GET_CLINIC_PROFILE_SUCCESS: 
      return { clinicprofile: action.payload };   
    case ADD_NEW_PATIENT_REQUEST:
      return { loading: true };
    case ADD_NEW_PATIENT_SUCCESS:
      toast.success("patient Added");
      return { loading: false, addpatient: true };
    case GET_APPOINTMENT_LIST_REQUEST: // // Get Clinic Profile
      return { loading: true };
    case GET_APPOINTMENT_LIST_SUCCESS:
      console.log(action.payload.results,"red")
      return { appointmentList: action.payload.results };
    case ADD_NEW_APPOINTMENT_REQUEST:
      return { loading: true };
    case ADD_NEW_APPOINTMENT_SUCCESS:
      toast.success("Appointment Added");
      return { loading: false, addappoint: true };  
    case UPDATE_PATIENT_REQUEST:
      return { loading: true };
    case UPDATE_PATIENT_SUCCESS:
      toast.success("Patient updated");
      return { loading: false, updatepatient: true };
    case UPDATE_CLINIC_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_CLINIC_PROFILE_SUCCESS:
      toast.success("Clinic Profile Updated");
      return { loading: false };  
    case GET_MEDICINE_LIST_REQUEST:
      return { loading: true };
    case GET_MEDICINE_LIST_SUCCESS:
      return { medicineList : action.payload.results };
    case ADD_NEW_MEDICINE_REQUEST:
      return { loading: true };
    case ADD_NEW_MEDICINE_SUCCESS:
      toast.success("Medicine Added");
      return { loading: false, addmedi:true };  
    case UPDATE_STAFF_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_STAFF_PROFILE_SUCCESS:
      toast.success("Staff Profile Updated");
      return { loading: false };   
    case GET__NON_AVAILABILITY_REQUEST:
      return { loading: true };
    case GET_NON_AVAILABILITY_LIST_SUCCESS:
      return { non_availabilityList : action.payload.results };
    case ADD_NON_AVAILABILITY_REQUEST:
      return { loading: true };
    case ADD_NON_AVAILABILITY_SUCCESS:
      toast.success("Non Availability added");
      return{ loading: false, addnonavi: true} // add boolean for dialog loader.
    case DELETE_NON_AVAILABILITY_REQUEST: // DeleteNonAvailability
      return { loading: true };
    case DELETE_NON_AVAILABILITY_SUCCESS:
      toast.success("Non Availability deleted");
      return { loading: false, delnonavi: true };
    case CLINIC_SERVER_ERROR:
      console.log(action.payload.message,"chk message")
      if(action.payload.message==="email user account with this email already exists."){
        console.log("yes")
        toast.error("this email already in used plz choose other email");
        return { loading: false, emailexist: true };
      } else if(action.payload.message==="non_field_errors that doctor with that date already added"){
        toast.error("that doctor with that already added a slots if you wont to add more slots plz delete the slots and add again");
        return { loading: false, alreayaddnonslots: true };
      }else if(action.payload.message==="non_field_errors this patient has an appoiment with other doctor on same date & slots"){
        toast.error("That patient already has an appointment with other doctor on same date & time");
        return { loading: false, alreayhasapp: true };
      }
    default:
      return state;
  }
};

export default ClinicReducer;
