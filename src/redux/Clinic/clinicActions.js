import { AddNewStaff, DeleteStaffService, GetStaffList, UpdateStaff,AddNewPatient,GetPatientList,GetDoctorAvailabilityList,UpdateDoctorAvailability,DeleteDoctorAvailability,AddNewDoctorAvailability,GetAppointmentList,AddNewAppointment,UpdateAppointment,DeleteAppointment,UpdatePatient, GetClinicProfile,UpdateClinicProfile, GetMedicineList, AddNewMedicine, UpdateStaffProfile, GetDashboardData,GetNonAvailabityList,AddNonAvailability,DeleteNonAvailability } from "../services/Clinic";
import { AddNewDoctor, GetDoctorList, UpdateDoctor } from "../services/Doctor";
import {
  GET_PATIENT_LIST_SUCCESS,
  GET_PATIENT_LIST_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_REQUEST, 
  ADD_NEW_STAFF_REQUEST,
  ADD_NEW_STAFF_SUCCESS,
  CLINIC_SERVER_ERROR,
  GET_STAFF_LIST_REQUEST,
  GET_STAFF_LIST_SUCCESS,
  GET_DOCTOR_LIST_REQUEST,
  GET_DOCTOR_LIST_SUCCESS,
  ADD_NEW_DOCTOR_REQUEST,
  GET_DOCTOR_AVAILABILITY_LIST_REQUEST,
  GET_DOCTOR_AVAILABILITY_LIST_SUCCESS,
  ADD_NEW_DOCTOR_AVAILABILITY_REQUEST,
  ADD_NEW_DOCTOR_AVAILABILITY_SUCCESS,
  UPDATE_DOCTOR_AVAILABILITY_REQUEST,
  UPDATE_DOCTOR_AVAILABILITY_SUCCESS,
  DELETE_DOCTOR_AVAILABILITY_SUCCESS,
  ADD_NEW_DOCTOR_SUCCESS,
  ADD_NEW_PATIENT_REQUEST,
  ADD_NEW_PATIENT_SUCCESS,
  GET_APPOINTMENT_LIST_REQUEST,
  GET_APPOINTMENT_LIST_SUCCESS,
  ADD_NEW_APPOINTMENT_REQUEST,
  ADD_NEW_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  GET_CLINIC_PROFILE_REQUEST,
  GET_CLINIC_PROFILE_SUCCESS,
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
  GET_DASHBOARD_DATA_REQUEST,
  GET_DASHBOARD_DATA_SUCCESS,
  GET__NON_AVAILABILITY_REQUEST,
  GET_NON_AVAILABILITY_LIST_SUCCESS,
  ADD_NON_AVAILABILITY_REQUEST,
  ADD_NON_AVAILABILITY_SUCCESS,
  DELETE_NON_AVAILABILITY_REQUEST,
  DELETE_NON_AVAILABILITY_SUCCESS,
} from "./clinicConstant";
import { toast } from "react-toastify";

// staff
export const GetStaffListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_STAFF_LIST_REQUEST,
    payload: []
  });

  GetStaffList(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_STAFF_LIST_SUCCESS,
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

export const AddNewStaffAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NEW_STAFF_REQUEST,
    payload: []
  });
  AddNewStaff(data, token).then(res => {
    if (res.status == 201) {
      dispatch({
        type: ADD_NEW_STAFF_SUCCESS,
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


export const UpdateStaffAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_STAFF_REQUEST,
    payload: []
  });

  UpdateStaff(data, token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: UPDATE_STAFF_SUCCESS,
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


export const DeleteStaff = (data, token , navigate) => async(dispatch) => {
  dispatch({
    type: DELETE_STAFF_REQUEST,
  })

  await DeleteStaffService(data.id, token).then(res => {
    if (res.status == 204) {
      dispatch({
        type: DELETE_STAFF_SUCCESS,
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

// Doctor
export const GetDoctorListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_LIST_REQUEST,
    payload: []
  });

  GetDoctorList(token).then(res => {
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

export const GetPatientListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_PATIENT_LIST_REQUEST,
    payload: []
  });

  GetPatientList(token).then(res => {
    console.log(res, "Datahgj");
    if (res.status == 200) {
      dispatch({
        type: GET_PATIENT_LIST_SUCCESS,
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


export const UpdatePatientAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_PATIENT_REQUEST,
    payload: []
  });

  UpdatePatient(data, token).then(res => {
    console.log(res, "Data");
    console.log(data,"action data")
    if (res.status == 200) {
      dispatch({
        type: UPDATE_PATIENT_SUCCESS,
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

// Doctor Availability Actions


export const GetDoctorAvailabilityListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DOCTOR_AVAILABILITY_LIST_REQUEST,
    payload: []
  });

  GetDoctorAvailabilityList(token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: GET_DOCTOR_AVAILABILITY_LIST_SUCCESS,
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

export const AddNewDoctorAvailabilityAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NEW_DOCTOR_AVAILABILITY_REQUEST,
    payload: []
  });

  AddNewDoctorAvailability(data, token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: ADD_NEW_DOCTOR_AVAILABILITY_SUCCESS,
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


export const UpdateDoctorAvailabilityAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_DOCTOR_AVAILABILITY_REQUEST,
    payload: []
  });

  UpdateDoctorAvailability(data, token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: UPDATE_DOCTOR_AVAILABILITY_SUCCESS,
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


export const DeleteDoctorAvailabilityAction = (data, token , navigate) => async(dispatch) => {
  dispatch({
    type: DELETE_STAFF_REQUEST,
  })

  await DeleteDoctorAvailability(data.id, token).then(res => {
    if (res.status == 204) {
      dispatch({
        type: DELETE_DOCTOR_AVAILABILITY_SUCCESS,
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


export const AddNewPatientAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NEW_PATIENT_REQUEST,
    payload: []
  });

  AddNewPatient(data, token).then(res => {
    console.log(res, "patientdata");
    if (res.status == 200) {
      dispatch({
        type: ADD_NEW_PATIENT_SUCCESS,
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



export const AddNewAppointmentAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NEW_APPOINTMENT_REQUEST,
    payload: []
  });

  AddNewAppointment(data, token).then(res => {
    if (res.status == 200) {
      dispatch({
        type: ADD_NEW_APPOINTMENT_SUCCESS,
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


export const UpdateAppointmentAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_APPOINTMENT_REQUEST,
    payload: []
  });

  UpdateAppointment(data, token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: UPDATE_APPOINTMENT_SUCCESS,
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


export const DeleteAppointmentAction = (data, token , navigate) => async(dispatch) => {
  dispatch({
    type: DELETE_APPOINTMENT_REQUEST,
  })

  await DeleteAppointment(data.id, token).then(res => {
    if (res.status == 204) {
      dispatch({
        type: DELETE_APPOINTMENT_SUCCESS,
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

// Get Clinic Profile
export const GetClinicProfileAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_CLINIC_PROFILE_REQUEST,
    payload: []
  });

  GetClinicProfile(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_CLINIC_PROFILE_SUCCESS,
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

//Update Clinic Profile
export const UpdateClinicProfileAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_CLINIC_PROFILE_REQUEST,
    payload: []
  });

  UpdateClinicProfile(data, token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: UPDATE_CLINIC_PROFILE_SUCCESS,
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



// Appointment Actions

export const GetAppointmentListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_APPOINTMENT_LIST_REQUEST,
    payload: []
  });

  GetAppointmentList(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_APPOINTMENT_LIST_SUCCESS,
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


//Medicine

export const GetMedicineListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_MEDICINE_LIST_REQUEST,
    payload: []
  });

  GetMedicineList(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_MEDICINE_LIST_SUCCESS,
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

export const AddNewMedicineAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NEW_MEDICINE_REQUEST,
    payload: []
  });

  AddNewMedicine(data, token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: ADD_NEW_MEDICINE_SUCCESS,
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


export const UpdateStaffProfileAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: UPDATE_STAFF_PROFILE_REQUEST,
    payload: []
  });

  UpdateStaffProfile(data, token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: UPDATE_STAFF_PROFILE_SUCCESS,
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


export const GetDashboardListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET_DASHBOARD_DATA_REQUEST,
    payload: []
  });

  GetDashboardData(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_DASHBOARD_DATA_SUCCESS,
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



export const GetNonAvailabilityListAction = (token, navigate) => dispatch => {
  
  dispatch({
    type: GET__NON_AVAILABILITY_REQUEST,
    payload: []
  });

  GetNonAvailabityList(token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: GET_NON_AVAILABILITY_LIST_SUCCESS,
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


export const AddNonAvailabilityAction = (data, token, navigate) => dispatch => {
  dispatch({
    type: ADD_NON_AVAILABILITY_REQUEST,
    payload: []
  });

  AddNonAvailability(data, token).then(res => {
    console.log(res, "Data");
    if (res.status == 200) {
      dispatch({
        type: ADD_NON_AVAILABILITY_SUCCESS,
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

export const DeleteNonAvailabilityAction = (data, token , navigate) => async(dispatch) => { // DeleteNonAvailability
  dispatch({
    type: DELETE_NON_AVAILABILITY_REQUEST,
  })

  await DeleteNonAvailability(data.id, token).then(res => {
    if (res.status == 204) {
      dispatch({
        type: DELETE_NON_AVAILABILITY_SUCCESS,
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