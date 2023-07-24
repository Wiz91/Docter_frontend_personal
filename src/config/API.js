const API = {
  Auth: {
    Login: "/account/login",
    Register: "/api/register"
  },
  Doctors: {
    Doctor: {
      ViewAllDoctors: '/account/view-all/doctor',
      AddDoctor: "/account/doctor/registration",
      UpdateDoctor: "/account/doctor-update/information",
      DeleteDoctor:"/account/doctor-delete",
      NonAvailability:"/appointment/view-all/doctor/non-availability",
    },
    DoctorProfile: {
      GetDoctorSelfProfile:"/account/view-self/doctor",
      UpdateDoctorSelfProfile: "/account/doctor-update/information"
    },
    DoctorSelf: {
      GetDoctorSelfAppointment: "/appointment/view/doctor-self/appointments",
      GetDoctorSelfPatient: "/appointment/view/doctor-self/patient",
      GetDoctorDashboardData: "/appointment/doctor/deshbord-data"
    },

    // DoctorAppointments:{
    //   ViewDoctorAppointments:"/appointment/view/doctor-self/appointments",
    // }
  },

  Clinic: {
    Staff: {
      GetAllStaffList: "/account/view-all/staff",
      AddStaff: "/account/staff/registration",
      DeleteStaff: '/account/staff-delete',
      UpdateStaff: '/account/staff-update/information',
    },
    Patient: {
      ViewAllPatient: '/appointment/view-all/patient',
      AddPatient: '/appointment/add/patient',
      UpdatePatient:'/appointment/update/patient',
      DeletePatient:'/account/doctor-delete',
      Testapi:'/appointment/test/patient/list'
 },
 DoctorAvailability: {
    ViewAllDoctorsAvailability: '/appointment/view-all/doctor/availability',
    AddDoctorAvailability: '/appointment/add/doctor/availability',
    AddNonAvailability:'/appointment/add/doctor/non-availability',
    DeleteNonAvailability:'appointment/delete/doctor/non-availability', // DeleteNonAvailability
 },
 ClinicProfile: {
  GetProfile: "/account/view-self/clinic", // Get Clinic Profile
  UpdateClinicProfile: "/account/clinic-update/information",
},
StaffProfile: {
  GetStaffProfile: "/account/view-self/staff", 
  UpdateStaffProfile: "/account/staff-update/information",
},
Medicine:{
  ViewAllMedicine:'/appointment/view-all/medicine',
  AddMedicine:'/appointment/add/medicine',
},
Appointment: {
  ViewAllAppointment:'/appointment/view-all/appointments',
  AddAppointment:'/appointment/add/appointment',
},
Dashboard:{
  ViewDashboardData:'/account/view/dashboard-data',
}
 
  }
};


export default API;
