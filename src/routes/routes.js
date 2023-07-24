import {
  // BrowserRouter,
  Route,
  Routes,
  // useNavigate,
  Navigate,
  useNavigate
} from "react-router-dom";
import React from 'react'
// import Home from "../container/Home";
import Login from "../container/auth/Login";
// import About from "../container/About";
// import Header from "../components/Header";
// import Products from "../container/Products";
import { useSelector } from "react-redux";
import Dashboard from "../container/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import StaffList from "../container/clinic/Staff/Stafflist";
import ClinicLayout from "../components/Layout/Clinic/ClinicLayout";
import DoctorList from "../container/clinic/doctors/Doctorlist";
import PatientList from "../container/clinic/patient/Patientlist";
import DoctorsDashboard from '../container/pages/DoctorDashboard';
import Profile from "../container/clinic/ClinicProfile/Profile";
import DoctorAvailabilityList from "../container/clinic/DoctorAvailability/DoctorAvailabilitylist";
import AppointmentList from "../container/clinic/Appointments/AppointmentList";
import DoctorProfile from "../container/doctor/DoctorProfile/DoctorProfile";
import DoctorSelfAppointment from "../container/doctor/SelfAppointment/DocSelfAppointment";
import DoctorSelfPatientList from "../container/doctor/Patient/SelfPatientlist";
import MedicineList from "../container/clinic/Medicines/MedicineList";
import Doctor_non_avi_List from "../container/clinic/Doctor_non_availability/doctor_non_avail_list";
// import DoctorPatientList from "../container/doctor/Patient/Patientlist";



const AppRouter = (props) => {
  
  const adddoctor_nav=useSelector((state)=>state.doctor.status)
  const loginType = useSelector((state) => state.login.type);
  const state = useSelector((state) => state)
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(state)
    if (loginType == 'DOCTOR') {
      navigate('/doctor/doctordashboard')


    }
    if (loginType == 'CLINIC' || loginType == "STAFF") {
      navigate('/clinic/dashboard')
    }

   if(adddoctor_nav==200){
    navigate('/clinic/doctors/list')
   }

    console.log()
  }, [loginType])


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Clinic Private Routes */}
        {(loginType == "CLINIC") && <>     
          <Route path="/clinic/dashboard" element={<Dashboard />} />
          <Route path="/clinic/staff/list" element={<StaffList />} />
          <Route path="/clinic/doctors/list" element={<DoctorList />} />
          <Route path='/clinic/patient/list' element={<PatientList/>} />
          <Route path="/clinic/ClinicProfile/Profile" element={<Profile/>} />
          <Route path='/clinic/appointment/list' element={<DoctorAvailabilityList/>} />
          <Route path='/clinic/medicine/list' element={<MedicineList/>} /> 
          <Route path='/clinic/Doctor_non_availability/list' element={<Doctor_non_avi_List/>} /> 
        </>}


        {(loginType == "STAFF") && <>     
          <Route path="/clinic/dashboard" element={<Dashboard />} />
          <Route path="/clinic/doctors/list" element={<DoctorList />} />
          <Route path='/clinic/patient/list' element={<PatientList/>} />
          <Route path="/clinic/ClinicProfile/Profile" element={<Profile/>} />
          <Route path='/clinic/appointment/list' element={<DoctorAvailabilityList/>} />
          <Route path='/clinic/medicine/list' element={<MedicineList/>} />
          <Route path='/clinic/Doctor_non_availability/list' element={<Doctor_non_avi_List/>} />
          {/* <Route path='/clinic/appointment/list' element={<AppointmentList/>} />  */}
        </>}


        {/* End of Clinic Private Routes */}


        {/* Doctor Private Routes */}

        {loginType == "DOCTOR" && <>
          <Route path="/doctor/doctordashboard" element={<DoctorsDashboard />} />
          <Route path="/doctor/DoctorProfile/DoctorProfile" element={<DoctorProfile/>} />
          <Route path="/doctor/self/appointment" element={<DoctorSelfAppointment />} />
          <Route path='/doctor/self/patient/list' element={<DoctorSelfPatientList />} />
        </>}

        {/* End of Doctor Private Routes */}

        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>

      <ToastContainer />
    </>
  );
};

export default AppRouter;
