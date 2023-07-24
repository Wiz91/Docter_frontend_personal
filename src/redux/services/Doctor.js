import API from "../../config/API";
import DataService from "../../config/Dataservice";
import { handleError, setHeadersWithAccessToken } from "./Comman";


//Doctor Funtionality

export const AddNewDoctor = async (data, token) => {
  // console.log(data,"chkefile")
  setHeadersWithAccessToken(token);
  return DataService.post(API.Doctors.Doctor.AddDoctor, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      console.log(res.data,"chkdata")
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};


export const UpdateDoctor = async(data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.put(API.Doctors.Doctor.UpdateDoctor, data,{
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


export const GetDoctorList = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.Doctor.ViewAllDoctors)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


export const DeleteDoctor = async (data, token) => {
  setHeadersWithAccessToken(token);
  return DataService.delete(`${API.Doctors.Doctor.DeleteDoctor}/${data.id}`).then(res => {
    // return res.data;
    return res;
  })
    .catch(err => {
      return handleError(err);
    });;
};


// Doctor Profile

export const GetDoctorSelfAppointment = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.DoctorSelf.GetDoctorSelfAppointment)
    .then((res) => {
      console.log("Doctor self appointment",res.data);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const UpdateDoctorSelfProfile = async(data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.put(API.Doctors.DoctorProfile.UpdateDoctorSelfProfile, data,{
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

export const GetDoctorSelfPatient = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.DoctorSelf.GetDoctorSelfPatient)
    .then((res) => {
      console.log("Doctor self Patient",res.data);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const GetDoctorDashboardData = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.DoctorSelf.GetDoctorDashboardData)
    .then((res) => {
      console.log("Doctor Dashboard Data",res.data);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const GetDoctorSelfProfile = async (token) => {
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Doctors.DoctorProfile.GetDoctorSelfProfile)
    .then((res) => {
      console.log("Doctor self Patient",res.data);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};