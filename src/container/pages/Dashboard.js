import React from 'react'
// import DoctorsHeader from '../../components/Layout/Doctors/DoctorsHeader';
import ClinicLayout from '../../components/Layout/Clinic/ClinicLayout';
// import StatsCard from '../../components/comman/StatsCard/StatsCard';
// import animationData from './data.json'
// import Lottie from 'react-lottie'
// import Index from '../../components';
import Skeleton from 'react-loading-skeleton'
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
  import { DeleteStaff, GetDashboardListAction, GetPatientListAction } from '../../redux/Clinic/clinicActions';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentList from '../clinic/Appointments/AppointmentList';
const Dashboard = () => {
    const userType = useSelector(state => state.login.type);

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.login.accessToken)
    const dashboardList = useSelector(state => state.clinic.dashboardList)
    console.log(dashboardList,"dashh")
    

    React.useEffect(() => {
      dispatch(GetDashboardListAction(accessToken))
    }, [])


    
    if (dashboardList != null){
      // console.log("wait...")
    if (userType=='CLINIC'){

    return <>
    <ClinicLayout>
        {/* {userType} */}
        <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 text-center">
              {/* <div> */}
                <Typography color="blue-gray" className="font-serif text-3xl">
                {userType} DASHBOARD
                </Typography>
            </div>
        </CardHeader>
        <CardBody className='flex gap-4 -mt-4'>
        {dashboardList && <>{dashboardList.map((dashboard, index) => {
                  return (
                    <>
            <Card className='w-3/12 lg:h-32 md:h-24 shadow-md bg-[#D3EDD3]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Staff</Typography>
                <PeopleAltOutlinedIcon className='self-start mt-3 ml-4 border rounded-full p-2 bg-white text-[#7dc47d]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>   
                <Typography className="self-end lg:mr-10 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_staff}</Typography>
            </Card>
            <Card className='w-3/12 lg:h-32 md:h-24 shadow-md bg-[#e6d9ffd8]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Patients</Typography>
                <AirlineSeatIndividualSuiteOutlinedIcon className='self-start mt-3 ml-4 border rounded-full p-2 bg-white text-[#8e6acfd8]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>
                <Typography className="self-end lg:mr-10 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_patients}</Typography>
                </Card>
            <Card className='w-3/12 lg:h-32 md:h-24 shadow-md bg-[#FFEDD5]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Appointments</Typography>
                <AssignmentTurnedInOutlinedIcon className='self-start mt-3 ml-4 border rounded-full p-2 bg-white text-[#b6976f]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>
                <Typography className="self-end lg:mr-10 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_appointments}</Typography>
            </Card>
            <Card className='w-3/12 lg:h-32 md:h-24 shadow-md bg-[#b6e1f8bb]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Doctors</Typography>
                <LocalHospitalOutlinedIcon className='self-start mt-3 ml-4 border rounded-full p-2 bg-white text-[#618da5bb]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>
                <Typography className="self-end lg:mr-10 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_doctors}</Typography>
            </Card> 
            </>
            );
          })} </>}
        </CardBody>
        <CardBody className='-mt-3'>
        {dashboardList && <>{dashboardList.map((dashboard, index) => {
                  return (
                    <>
<CChart
  type="bar"
  height={120}
  className='font-serif text-xl'
  data={{
    labels: ['Total Patients', 'Total Appointments', 'Total Doctors', 'Total Staff'],
    datasets: [
      {
        label: 'Dashboard Data',
        backgroundColor: [
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
        data : [dashboard.total_patients,dashboard.total_appointments,dashboard.total_doctors,dashboard.total_staff],
      },
    ],
  }}
  labels="Dashboard Data"
  options={{
    scales: {
      x: {
        grid: {
          display:false,
        },
      },
    },
  }}
/>
</>
  );
})} </>}
</CardBody>
        </Card>
    </ClinicLayout>
    </>;
    }
    return <>
    <ClinicLayout>
        {/* {userType} */}
        <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 text-center">
              {/* <div> */}
                <Typography color="blue-gray" className="font-serif text-3xl">
                {userType} DASHBOARD
                </Typography>
            </div>
        </CardHeader>
        <CardBody className='flex gap-4 -mt-4'>
            {dashboardList && <>{dashboardList.map((dashboard, index) => {
                  return (
                    <>
            <Card className='w-4/12 h-32 shadow-md bg-[#b6e1f8bb]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Patients</Typography>
                <AirlineSeatIndividualSuiteOutlinedIcon className='self-start mt-3 ml-12 border rounded-full p-2 bg-white text-[#618da5bb]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>
                <Typography className="self-end lg:mr-14 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_patients}</Typography>
                </Card>
            <Card className='w-4/12 h-32 shadow-md bg-[#FFEDD5]' class="flex-1 " color=''>
                <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Appointments</Typography>
                <AssignmentTurnedInOutlinedIcon className='self-start mt-3 ml-12 border rounded-full p-2 bg-white text-[#b6976f]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>
                <Typography className="self-end lg:mr-14 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_appointments}</Typography>
            </Card>
            <Card className='w-4/12 h-32 shadow-md bg-[#D3EDD3]' class="flex-1 " color=''>
            <Typography className="self-center lg:mt-2 lg:text-[22px] font-semibold font-serif">Total Doctors</Typography>
                <LocalHospitalOutlinedIcon className='self-start mt-3 ml-12 border rounded-full p-2 bg-white text-[#7dc47d]' sx={{fontSize: { xs: 50, sm: 40, md: 100, lg: 55 } }}/>   
                <Typography className="self-end lg:mr-14 lg:-mt-13 lg:text-[30px] md:text-[35px] md:mr-6 md:-mt-12 font-semibold">{dashboard.total_doctors}</Typography>
            </Card> 
            </>
            );
          })} </>}
        </CardBody>
        <CardBody className='-mt-4'>
        {dashboardList && <>{dashboardList.map((dashboard, index) => {
                  return (
                    <>
<CChart
  type="bar"
  height={120}
  data={{
    labels: ['Total Patients', 'Total Appointments', 'Total Doctors'],
    datasets: [
      {
        label: 'Dashboard Data',
        backgroundColor: [
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
        barPercentage: 0.8,
        data : [dashboard.total_patients,dashboard.total_appointments,dashboard.total_doctors],
      },
    ],
  }}
  labels="Dashboard Data"
  options={{
    scales: {
      x: {
        grid: {
          display:false,
        },
      },
    },
  }}
/>
</>
  );
})} </>}

</CardBody>
        </Card>
    </ClinicLayout>
    </>;
  }
    return (
      <>
  
            <ClinicLayout>
            <div class="flex-1" className='h-full w-full float-left'>
              
              <Skeleton height={30} width={350} style={{marginTop: 10, marginLeft:400}}/>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 10, marginLeft:40}}/> */}
              <Skeleton height={120} width={270} inline={true} style={{marginTop: 40, marginLeft:30}}/>
              <Skeleton count={3} height={120} width={270} inline={true} style={{marginTop: 40, marginLeft:10}}/>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 0, marginLeft:40}}/> */}
              <Skeleton height={300} width={1100} style={{marginTop: 40, marginLeft:30}}/>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 0, marginLeft:40}}/> */}
              
            </div>
            </ClinicLayout>
            {/* </div> */}
      </>
    )
}


export default Dashboard;
