import React, {useEffect, useState} from 'react'
// import DoctorHeader from '../../components/Layout/Doctors/DoctorsHeader';
import DoctorLayout from '../../components/Layout/Doctors/DoctorLayout';
// import StatsCard from '../../components/comman/StatsCard/StatsCard';
// import Index from '../../components';
// import animationData from './data.json'
import Lottie from 'react-lottie'

// import Index from '../../components';
import Skeleton from 'react-loading-skeleton'
import axios, { all } from 'axios';
import 'react-loading-skeleton/dist/skeleton.css'
import { CChart } from '@coreui/react-chartjs';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
  import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
  import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
  import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
  import { GetDoctorSelfAppointmentAction, GetDoctorDashboardDataAction } from '../../redux/Doctor/doctorAction'
  import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@material-ui/core';
const DoctorDashboard = () => {
    const userType = useSelector(state => state.login.type);
    const token = useSelector(state => state.login.accessToken);
    // const doctorDashboard = useSelector(state => state.doctor.doctorDashboard)
    const [alldashboard, setalldashboard] = useState(null);
    const [allpatient, setallpatient] = useState(); 
    const [allappointments,setallappointments] =  useState(null);
    const dispatch = useDispatch()

    // const [dates,setdates]=useState([]);
    // console.log(dates)

    console.log(allpatient,"patient")
  // React.useEffect(() => {
  //   dispatch(GetDoctorDashboardDataAction(accessToken))
  //   // console.log(a,"xyz")
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard API
        const response1 = await axios.get('https://sagar.pythonanywhere.com/appointment/doctor/deshbord-data',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        setalldashboard(response1.data.data);

        // Fetch patient API
        const response2 = await axios.get('https://sagar.pythonanywhere.com/appointment/view/doctor-self/patient',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
          });
        setallpatient(response2.data.data);

        // Fetch allappointment api
        const response3 = await axios.get('https://sagar.pythonanywhere.com/appointment/view/doctor-self/appointments',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        setallappointments(response3.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);


  //function to calculate month wise appointment
  const getMonthlyAppointmentCount = () => {
    const counts = {};
    {allappointments && <>{allappointments.map((appoint,ind) => {
      const date = new Date(appoint.date_of_appointment);
      const month = date.getMonth() + 1; 
  
      if (counts[month]) {
        counts[month] += 1;
      } else {
        counts[month] = 1;
      }
    })}</>}
    // Fill in zero values for months without patients
    for (let month = 1; month <= 12; month++) {
    if (!counts[month]) {
      counts[month] = 0;
    }
  }
  
    return counts;
  };
  const monthlyAppointmentCount = getMonthlyAppointmentCount();
  console.log(monthlyAppointmentCount,"appointment list")

  //function to calculate month wise patient
  const getMonthlyPatientCount = () => {
    const count = {};
    {allpatient && <>{allpatient.map((pat,ind) => {
    const date = new Date(pat.date_of_creation);
      const month = date.getMonth() + 1; 
  
      if (count[month]) {
        count[month] += 1;
      } else {
        count[month] = 1;
      }
    
    })}</>}
    // Fill in zero values for months without patients
    for (let month = 1; month <= 12; month++) {
    if (!count[month]) {
      count[month] = 0;
    }
  }
    return count;
  }
  const monthlyPatientCount = getMonthlyPatientCount();
  console.log(monthlyPatientCount,"patient list")

    if (alldashboard != null){
      
  
      return <>
      <DoctorLayout>
          {/* {userType} */}
          <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 text-center">
                <div>
                  <Typography variant="" color="blue-gray" className='font-serif text-3xl' > 
                  {userType} DASHBOARD
                  </Typography>
                </div>
              </div>
          </CardHeader>
          <CardBody className='flex gap-20 -mt-4'>
              {alldashboard && <>{alldashboard.map((dashboard,index)=> {
                return(
                  <>
                  
                  <Card className='w-6/12 h-40 shadow-[0px_0px_6px_-2px_rgba(0,0,0,0.3)] bg-[#dcfce7]' class="flex-1" color=''>
                  <div class="flex justify-between ...">
                  <AirlineSeatIndividualSuiteOutlinedIcon className='border rounded-full self-center bg-white p-4 mt-12 ml-5 text-[#4fa16c]' sx={{ fontSize: 70 }}/>
                  <Typography className="mt-10 text-[30px] mr-12 self-center font-serif font-semibold">Total Patient</Typography>
                  <Typography className="mt-10  mr-4 text-[43px] font-semibold self-center">{dashboard.total_No_of_patient_of_doctor}</Typography>
                  </div>
                  </Card>
                  <Card className='w-6/12 h-40 shadow-[0px_0px_6px_-2px_rgba(0,0,0,0.3)] bg-[#b6e1f8bb]' class="flex-1 " color=''>
                  <div class="flex justify-between ...">
                  <AssignmentTurnedInOutlinedIcon className='mt-12 ml-5 border rounded-full self-center bg-white p-4 text-[#618da5bb]' sx={{ fontSize: 70 }}/>
                  <Typography className="mt-10 text-[30px] mr-12 self-center font-serif font-semibold ">Total Appointments</Typography>
                  <Typography className="mt-10  mr-4 text-[43px] font-semibold self-center">{dashboard.Doctor_total_appointments}</Typography>
                  </div>
                  </Card>
                  </>
                )
              })}</>}
          </CardBody>
          <CardBody className='-mt-4'>
          <CChart height={100}
    type="line" 
    data={{
      labels: ["January", "February", "March", "April", "May", "June", "July", "August","September","October","November","December"],
      // labels: Object.keys(monthlyAppointmentCount,monthlyPatientCount),
      datasets: [
        {
          label: "Patient dataset",
          backgroundColor: "Green",
          borderColor: "DarkSeaGreen",
          pointBackgroundColor: "Green",
          pointBorderColor: "Green",
          data: Object.values(monthlyPatientCount),
          // data :[2,5,6,9,0,6],
          pointBoardWidth: "10",
          // tension:0.5
        },
        {
          label: "Appointment dataset",
          backgroundColor: "blue",
          borderColor: "SkyBlue",
          pointBackgroundColor: "blue",
          pointBorderColor: "DeepSkyBlue",
          data: Object.values(monthlyAppointmentCount),
          pointBoardWidth: "10",
          // tension:0.5
        },
      ],
    }}
  />
  </CardBody>
  <CardFooter>
  </CardFooter>
          </Card>
      </DoctorLayout>
      </>;
      }
      return (
        <>
              <DoctorLayout>
              <div class="flex-1" className='h-full w-full float-left'>
              <Skeleton height={30} width={350} style={{marginTop: 10, marginLeft:400}}/>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 10, marginLeft:40}}/> */}
              <Skeleton height={120} width={520} inline={true} style={{marginTop: 40, marginLeft:30}}/>
              <Skeleton height={120} width={520} inline={true} style={{marginTop: 40, marginLeft:90}}/>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 0, marginLeft:40}}/> */}
              <Skeleton height={300} width={1100} style={{marginTop: 40, marginLeft:30}}/>
              </div>
              </DoctorLayout>
              {/* </div> */}
        </>
      )
  }


export default DoctorDashboard;
