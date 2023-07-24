import { GetDoctorList,AddNewDoctor,UpdateDoctor,DeleteDoctor,GetDoctorAppointmentList, GetDoctorSelfAppointment,UpdateDoctorSelfProfile, GetDoctorSelfPatient, GetDoctorDashboardData, GetDoctorSelfProfile } from "../services/Doctor";
import { UPDATE_DOCTOR_REQUEST,UPDATE_DOCTOR_SUCCESS } from "./doctorConstant";
import {
  GET_DOCTOR_LIST_REQUEST,
  GET_DOCTOR_LIST_SUCCESS,
  ADD_NEW_DOCTOR_REQUEST,
  ADD_NEW_DOCTOR_SUCCESS,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  CLINIC_SERVER_ERROR,
  GET_DOCTOR_APPOINTMENT_REQUEST,
  GET_DOCTOR_APPOINTMENT_SUCCESS,
  GET_DOCTOR_SELF_APPOINTMENT_REQUEST,
  GET_DOCTOR_SELF_APPOINTMENT_SUCCESS,
  UPDATE_DOCTOR_SELF_PROFILE_REQUEST,
  UPDATE_DOCTOR_SELF_PROFILE_SUCCESS,
  GET_DOCTOR_SELF_PATIENT_REQUEST,
  GET_DOCTOR_SELF_PATIENT_SUCCESS,
  GET_DOCTOR_DASHBOARD_DATA_REQUEST,
  GET_DOCTOR_DASHBOARD_DATA_SUCCESS,
  GET_DOCTOR_SELF_PROFILE_REQUEST,
  GET_DOCTOR_SELF_PROFILE_SUCCESS,
  // DOCTOR_SERVER_ERROR
} from "./doctorConstant";



export const GetDoctorListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_LIST_REQUEST,
    payload: []
  });

  GetDoctorList(token).then(res => {
    // console.log(res.data, "Datalist");
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_LIST_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const AddNewDoctorAction = (data, token, navigate) => dispatch => {
  console.log(data, "Data");
  dispatch({
    type: ADD_NEW_DOCTOR_REQUEST,
    payload: []
  });

  AddNewDoctor(data, token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: ADD_NEW_DOCTOR_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};

export const UpdatedoctorAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_DOCTOR_REQUEST,
    payload: []
  });

  UpdateDoctor(data, token).then(res => {
    // console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: UPDATE_DOCTOR_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const DeleteDoctorAction = (data, token , navigate) => async(dispatch) => {
  dispatch({
    type: DELETE_DOCTOR_REQUEST,
  })

  await DeleteDoctor(data.id, token).then(res => {
    if (res.status == 204) {
      dispatch({
        type: DELETE_DOCTOR_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  })
}

export const GetDoctorSelfAppointmentAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_SELF_APPOINTMENT_REQUEST,
    payload: []
  });

  GetDoctorSelfAppointment(token).then(res => {
    console.log(res, "Datassss");
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_SELF_APPOINTMENT_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};

export const UpdatedoctorSelfProfileAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_DOCTOR_SELF_PROFILE_REQUEST,
    payload: []
  });

  UpdateDoctorSelfProfile(data, token).then(res => {
    console.log(res, "myData");
    if (res.status == 200) {
      dispatch({
        type: UPDATE_DOCTOR_SELF_PROFILE_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};

export const GetDoctorSelfPatientAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_SELF_PATIENT_REQUEST,
    payload: []
  });

  GetDoctorSelfPatient(token).then(res => {
    console.log(res, "Patient Date");
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_SELF_PATIENT_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
};

export const GetDoctorDashboardDataAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_DASHBOARD_DATA_REQUEST,
    payload: []
  });

  GetDoctorDashboardData(token).then(res => {
    console.log(res, "Patient Date");
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_DASHBOARD_DATA_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
}

export const GetDoctorSelfProfileAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_SELF_PROFILE_REQUEST,
    payload: []
  });

  GetDoctorSelfProfile(token).then(res => {
    console.log(res, "Patient Date");
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_SELF_PROFILE_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLINIC_SERVER_ERROR,
        payload: res
      });
    }
  });
}