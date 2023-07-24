import React, { useState } from 'react'
import DoctorLayout from '../../../components/Layout/Doctors/DoctorLayout';
import Skeleton from 'react-loading-skeleton'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { useDispatch, useSelector } from 'react-redux';
import { GetDoctorSelfAppointmentAction } from '../../../redux/Doctor/doctorAction';
// import AddStaff from './AddStaff';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CreatePrescription from './CreatePrescription';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "monitored",
  },
  {
    label: "Inactive",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Date of Appointment", "Slote", "Status", "Patient Name", ""];

const DoctorSelfAppointment = () => {
  const accessToken = useSelector(state => state.login.accessToken)
  const doctorSelf = useSelector(state => state.doctor.doctorSelf)

  // const doctorList = useSelector(state => state.doctor.DoctorList)
  // console.log(doctorList,"DList")

  const [search, setSearch ] = useState('');
  // console.log(search)

  function convertToHumanTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    let formattedHours = (parseInt(hours, 10) % 12) || 12;
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const humanTime = `${formattedHours}:${minutes} ${meridiem}`;
    return humanTime;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  let x=doctorSelf

  if (typeof(doctorSelf)!="undefined"){
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctorSelf.slice(indexOfFirstItem, indexOfLastItem);
  x=currentItems
  console.log(currentItems)
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };


//   const DeleteStaffButton = (staffId) => {
//     let data = {
//       id: staffId
//     }
//     dispatch(DeleteStaff(data, accessToken, navigate))
//   }

  React.useEffect(() => {
    dispatch(GetDoctorSelfAppointmentAction(accessToken))
    // console.log(a,"xyz")
  }, [])
  if( doctorSelf != null ){
  return (
    <>
      <DoctorLayout>
        <Card className="h-full w-full rounded-none">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8 mt-4">
                <div>
                  <Typography variant="h3" color="blue-gray" className="font-serif">
                    Appointment List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-medium">
                    See information about all appointment
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {/* <Button variant="outlined" color="blue-gray" size="sm"className=' bg-green-800 text-white'>
                    view all
                  </Button> */}
                  {/* <AddDoctor userDetails={false} /> */}
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value="all" className="w-full md:w-max">
                  {/* <TabsHeader>
                    {TABS.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader> */}
                </Tabs>
                <div className="w-full md:w-72">
                  <Input label="Search" onChange={(e) => setSearch(e.target.value)} icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0 h-3/5">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-bold text-lg leading-none opacity-70"
                        >
                          {head}{" "}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                {doctorSelf.length > 0 ? (
                <>
                <tbody>
                  {/* {doctorSelf && <>{doctorSelf.map((appointment, index) => {
                    const isLast = index === doctorSelf.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"; */}
                    {x && <>{x.filter((appointment) =>{
                    return search.toLowerCase() === '' ? appointment : appointment.Patient.patient_First_Name.toLowerCase().includes(search) || appointment.date_of_appointment.includes(search);
                  }).map((appointment, index) => {
                    const isLast = index === doctorSelf.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100";

                    return (
                      <tr>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <div className="flex flex-col">
                              {/* <Typography variant="small" color="blue-gray" className="font-normal">
                                {doctor.first_Name}  {doctor.last_Name}
                              </Typography> */}
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium opacity-70"
                              >
                                {appointment.date_of_appointment}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium opacity-70"
                            >
                              {convertToHumanTime(appointment.slots)}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={appointment.is_active ? "Active" : "Inactive"}
                              color={appointment.is_active ? "green" : "red"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {appointment.Patient.patient_First_Name}
                          </Typography>
                          {/* <p className='text-sm text-gray-700'>{doctor.address}</p> */}

                        </td>
                        <td className={`${classes} flex space-x-4 flex-row `} >
                          <CreatePrescription pat_id={appointment.Patient.id} patient_First_Name={appointment.Patient.patient_First_Name} contect={appointment.Patient.contect} gender={appointment.Patient.gender} address={appointment.Patient.address} date_of_appointment={appointment.date_of_appointment}patient_DOB={appointment.Patient.patient_DOB} weight={appointment.Patient.weight}/>
                          {/* <IconButton className='bg-red-500' onClick={(e) => { DeleteDoctorButton(doctor) }}>
                            <DeleteOutline />
                          </IconButton> */}
                        </td>
                      </tr>
                    );
                  })} </>}
                </tbody>
                </>
               ): 
               <>
               <Typography
                           variant="small"
                           color="blue-gray"
                           className="text-lg font-serif font-semibold opacity-70 mt-5"
                         >
                           No Data Found
                         </Typography>
               </>}
              </table>
            </CardBody>
            {doctorSelf.length > 0 ? (
                  <>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            {/* <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm">
                Next
              </Button>
            </div> */}
             <Typography variant="small" color="blue-gray" className="font-normal">
            Page <strong className="text-blue-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-blue-gray-900">100</strong>
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm" onClick={previousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm" onClick={nextPage} disabled={x.length < itemsPerPage}>
                Next
              </Button>
            </div>
          </CardFooter>
          </>
                ) : <>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
                </> }
          </Card>
      </DoctorLayout>
    </>
  )
}
return(
  <>
  <DoctorLayout>
  <div className='h-full w-full float-left'>
              
              
              <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8 mt-4">
                <div>
                  <Typography variant="h3" color="blue-gray" className="font-serif">
                    Appointment List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-medium">
                    See information about all appointment
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value="all" className="w-full md:w-max">
                  {/* <TabsHeader>
                    {TABS.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader> */}
                </Tabs>
                <div className="w-full md:w-72">
                  <Input label="Search" onChange={(e) => setSearch(e.target.value)} icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                </div>
              </div>
            </CardHeader>
              <Skeleton count={4} height={40} width={290} inline={true} style={{marginTop: 40, marginLeft:2}}/>
              <Skeleton height={30} width={1100} style={{marginTop: 40, marginLeft:30}}/>
              <Skeleton count={6} height={30} width={1100} style={{marginTop: 10, marginLeft:30}}/>
              
              
            </div>
  </DoctorLayout>
  </>
)
}
export default DoctorSelfAppointment;