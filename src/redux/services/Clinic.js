import API from "../../config/API";
import DataService from "../../config/Dataservice";
import { handleError, setHeadersWithAccessToken } from "./Comman";

export const GetStaffList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Staff.GetAllStaffList)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


export const AddNewStaff = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.post(API.Clinic.Staff.AddStaff, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};

export const UpdateStaff = async(data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.put(API.Clinic.Staff.UpdateStaff, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}


export const DeleteStaffService = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.delete(`${API.Clinic.Staff.DeleteStaff}/${data.id}`).then(res => {
    // return res.data;
    return res;
  })
    .catch(err => {
      return handleError(err);
    });;
};


export const GetDoctorList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Doctor.ViewAllDoctors)
    .then((res) => {
      console.log(res,"Par");
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


export const GetPatientList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Patient.ViewAllPatient)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


export const AddNewPatient = async (data, token) => {
  console.log(data,"chkpatientdata")
  setHeadersWithAccessToken(token);
  return DataService.post(API.Clinic.Patient.AddPatient, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};

// Doctor Availability


export const GetDoctorAvailabilityList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.DoctorAvailability.ViewAllDoctorsAvailability)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const AddNewDoctorAvailability = async (data, token) => {
  setHeadersWithAccessToken(token);
  console.log(data.id)
  return DataService.post(`${API.Clinic.DoctorAvailability.AddDoctorAvailability}/${data.id}`, data)
    .then(res => {
      // console.log(data)
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};


export const UpdateDoctorAvailability = async(data,token) =>{
  // setHeadersWithAccessToken(token);
  return DataService.put(API.Clinic.Staff.UpdateStaff, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}


export const DeleteDoctorAvailability = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.delete(`${API.Clinic.Staff.DeleteStaff}/${data.id}`).then(res => {
    return res.data;
  })
    .catch(err => {
      return handleError(err);
    });;
};

export const GetClinicProfile = async (token) => {     // Get Clinic Profile
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.ClinicProfile.GetProfile)
    .then((res) => {
      console.log("Clinic Profile",res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


// Appointment

export const GetAppointmentList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Appointment.ViewAllAppointment)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const AddNewAppointment = async (data, token) => {
  setHeadersWithAccessToken(token);
  console.log(data)
  return DataService.post(`${API.Clinic.Appointment.AddAppointment}/${data.doctor_id}`, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};


export const AddNonAvailability = async (data, token) => {
  setHeadersWithAccessToken(token);
  console.log(data)
  return DataService.post(`${API.Clinic.DoctorAvailability.AddNonAvailability}/${data.doctor_id}`, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};


export const UpdateAppointment = async(data,token) =>{
  // setHeadersWithAccessToken(token);
  return DataService.put(API.Clinic.Staff.UpdateStaff, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}


export const DeleteAppointment = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.delete(`${API.Clinic.Staff.DeleteStaff}/${data.id}`).then(res => {
    return res.data;
  })
    .catch(err => {
      return handleError(err);
    });;
};


export const UpdatePatient = async(data,token) =>{
  // console.log(data,"test id")
  setHeadersWithAccessToken(token);
  return DataService.put(`${API.Clinic.Patient.UpdatePatient}/${data.id}`,data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}

export const UpdateClinicProfile = async(data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.put(API.Clinic.ClinicProfile.UpdateClinicProfile, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}


export const GetMedicineList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Medicine.ViewAllMedicine)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const AddNewMedicine = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.post(API.Clinic.Medicine.AddMedicine, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};


export const UpdateStaffProfile = async(data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.put(API.Clinic.StaffProfile.UpdateStaffProfile, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
}

export const GetDashboardData = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Clinic.Dashboard.ViewDashboardData)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


//Non availability

export const GetNonAvailabityList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.Doctor.NonAvailability)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const DeleteNonAvailability = async (data, token) => { // DeleteNonAvailability
  setHeadersWithAccessToken(token);
  return DataService.delete(`${API.Clinic.DoctorAvailability.DeleteNonAvailability}/${data.id}`).then(res => {
    // return res.data;
    return res;
  })
    .catch(err => {
      return handleError(err);
    });;
};
