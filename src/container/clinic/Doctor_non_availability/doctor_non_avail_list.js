import React, {useState} from 'react'
import ClinicLayout from '../../../components/Layout/Clinic/ClinicLayout'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Skeleton from 'react-loading-skeleton'
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
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteDoctorAvailabilityAction, GetDoctorAvailabilityListAction,DeleteAppointmentAction ,GetNonAvailabilityListAction, DeleteNonAvailabilityAction} from '../../../redux/Clinic/clinicActions';
// import AddDoctorAvailabilities from './AddDoctorAvailability';
// import AddAppointments from '../Appointments/AddAppointment';
// import DoctorsNameList from './Doctorsnamelist';
import DoctorNon_avi_add from './add_doctor_non_availability'
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';





const TABLE_HEAD = ["Doctor Name","Slots","Date of Non-availability","Action"];


const Doctor_non_avi_List = () => {
  const accessToken = useSelector(state => state.login.accessToken)
  const non_avai_list = useSelector(state => state.clinic.non_availabilityList)
  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delnonavi = useSelector(state => state.clinic.delnonavi);
  
  function convertToHumanTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    let formattedHours = (parseInt(hours, 10) % 12) || 12;
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const humanTime = `${formattedHours}:${minutes} ${meridiem}`;
    return humanTime;
  }

  const [search, setSearch ] = useState('');
  console.log(search)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  let x=non_avai_list

  if (typeof(non_avai_list)!="undefined"){
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = non_avai_list.slice(indexOfFirstItem, indexOfLastItem);
  x=currentItems
  console.log(currentItems)
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  

  const DeleteAppointmentButton = (staffId) => {
    let data = {
      id: staffId
    }
    dispatch(DeleteNonAvailabilityAction(data, accessToken, navigate))
  }

if (delnonavi==true){
  console.log(delnonavi,"chkdel")
  dispatch(GetNonAvailabilityListAction(accessToken))
  navigate('/clinic/Doctor_non_availability/list')
}


  React.useEffect(() => {
    dispatch(GetNonAvailabilityListAction(accessToken))
    
  }, [])

  console.log(non_avai_list,"nonlist")
  if(non_avai_list != null){
  return (
    <>
      <ClinicLayout>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                {/* <YourComponent/> */}
                <Typography variant="h3" color="blue-gray" className="font-serif">
                  Non-Availability List
                </Typography>
                <Typography color="gray" className="text-lg font-serif">
                  See information about all Non-Availability
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" color="blue-gray" size="sm">
                  view all
                </Button> */}
                {/* <AddAppointments userDetails={false} /> */}
                <DoctorNon_avi_add/>
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
              {non_avai_list.length > 0 ? (
                  <>
              <tbody>
                {x && <>{x.filter((non_appointment) => {
                  return search.toLowerCase() === '' ? non_appointment: non_appointment.doctor[1].toLowerCase().includes(search) || non_appointment.doctor_non_availability_date.includes(search);
                }).map((non_appointment, index) => {
                  const isLast = index === non_avai_list.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {non_appointment.doctor[1]}
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
                            className="font-normal opacity-70"
                          >
                             <Popover
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                             >
                             <PopoverHandler>
                                <Button>Show Slots</Button>
                                   </PopoverHandler>
                               <PopoverContent>
                               {non_appointment.slots && <>{non_appointment.slots.map((slot, index) => {
                                const isLast = index === non_appointment.slots.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                               return (
                              <div>{slot}</div>
                                  );
                                })} </>}
                              
                              </PopoverContent>
                           </Popover>
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {non_appointment.doctor_non_availability_date}
                            {/* {convertToHumanTime(appointment.slot.slote_no)} */}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} flex space-x-4 flex-row`} >
                        <IconButton className='bg-red-500' onClick={(e) => { DeleteAppointmentButton(non_appointment) }}>
                          <DeleteOutline />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })} </>}
              </tbody>
              </>
                ) : <>
                <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-serif font-semibold ml-2 opacity-80 mt-5"
                          >
                            No Data Found
                          </Typography>
                </> }
            </table>
          </CardBody>
          {non_avai_list.length > 0 ? (
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
      </ClinicLayout>

    </>
  )
}
return(
  <>
  {/* <div className='flex'>
            <div class="flex-1" className='w-3/12 h-full'>
            <Skeleton height={40} width={250} style={{marginTop: 40, marginLeft:40}}/>
            <Skeleton height={40} width={200} style={{marginTop: 60, marginLeft:40}}/>
            <Skeleton count={4} height={40} width={200} style={{marginTop: 25, marginLeft:40}}/>
            
            </div> */}
            <ClinicLayout>
            <div class="flex-1" className='h-full w-full float-left'>
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 40, marginLeft:40}}/> */}
              {/* <Skeleton circle={true} width={50} height={50} style={{marginTop: 20, marginRight: 90, float:'right'}}/> */}
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 60, marginLeft:40}}/> */}
              {/* <Skeleton height={30} width={200} style={{marginTop: 20, marginLeft:30}}/>
              <Skeleton height={40} width={100} inline={true} style={{marginRight:40, float:'right'}}/>
              <Skeleton height={40} width={100} style={{float:'right'}}/>
              <Skeleton height={20} width={300} style={{marginTop: 10, marginLeft:30}}/> */}
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 10, marginLeft:40}}/> */}
              {/* <Skeleton height={30} width={270} inline={true} style={{marginTop: 20, marginLeft:30}}/>
              <Skeleton height={30} width={270} style={{marginTop: 20, marginRight:40, float:'right'}}/> */}
              {/* <Skeleton height={40} width={200} inline={true} style={{marginTop: 0, marginLeft:40}}/> */}
              <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                {/* <YourComponent/> */}
                <Typography variant="h3" color="blue-gray" className="font-serif">
                  Non-Availability List
                </Typography>
                <Typography color="gray" className="text-lg font-serif">
                  See information about all Non-Availability
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" color="blue-gray" size="sm">
                  view all
                </Button> */}
                {/* <AddAppointments userDetails={false} /> */}
                <DoctorNon_avi_add/>
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
                <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
              </div>
            </div>
          </CardHeader>
              <Skeleton count={4} height={40} width={290} inline={true} style={{marginTop: 40, marginLeft:2}}/>
              <Skeleton height={30} width={1100} style={{marginTop: 40, marginLeft:30}}/>
              <Skeleton count={6} height={30} width={1100} style={{marginTop: 10, marginLeft:30}}/>
              
              
            </div>
            </ClinicLayout>
  {/* </div> */}
  </>
)
}
export default Doctor_non_avi_List;