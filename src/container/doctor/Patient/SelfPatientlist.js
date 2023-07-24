import React,{useState} from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Skeleton from 'react-loading-skeleton'
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
import { GetDoctorSelfPatientAction} from '../../../redux/Doctor/doctorAction'
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ViewMoreSelfPatientDetails from './ViewMoreSelfPatientDetails';
import DoctorLayout from '../../../components/Layout/Doctors/DoctorLayout';

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

const TABLE_HEAD = ["Patient Name", "Date of Birth", "Gender", "Address & contact",""];


const DoctorSelfPatientList = () => {
  const accessToken = useSelector(state => state.login.accessToken)
  const PatientSelfList = useSelector(state => state.doctor.PatientSelfList)

  const [search, setSearch ] = useState('');
  console.log(search)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  let x=PatientSelfList

  if (typeof(PatientSelfList)!="undefined"){
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PatientSelfList.slice(indexOfFirstItem, indexOfLastItem);
  x=currentItems
  console.log(currentItems)
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

 

  React.useEffect(() => {
    dispatch(GetDoctorSelfPatientAction(accessToken))
  }, [])
  if( PatientSelfList != null){
  return (
    <>
      <DoctorLayout>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h3" color="blue-gray" className="font-serif">
                   My Patient List
                </Typography>
                <Typography color="gray" className="mt-1 font-medium">
                  See information about all patients
                </Typography>
              </div>
              {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" color="blue-gray" size="sm" className='bg-green-800 text-white'>
                  view all
                </Button>
                
              </div> */}
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
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
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
              {PatientSelfList.length > 0 ? (
                <>
              <tbody>
                 {x && <>{x.filter((patient) =>{
                  return search.toLowerCase() === '' ? patient : patient.patient_First_Name.toLowerCase().includes(search);
                }).map((patient, index) => {
                  const isLast = index === PatientSelfList.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100";

                  return (
                    <tr key={patient.DOB}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {patient.patient_First_Name}  {patient.patient_Last_Name}
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
                            {patient.DOB}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {patient.gender}
                          </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {patient.contect || 9131298171}
                        </Typography>
                        <p className='text-sm text-gray-700'>{patient.address || '143 Mahaveer Complex Jaora'}</p>

                      </td>
                      <td className={`${classes} flex space-x-4 flex-row `} >
                      <ViewMoreSelfPatientDetails pat_id={patient.id} medical_condition={patient.medical_Conditions} pastsurgery={patient.past_Surgeries_or_Hospitalizations} knownallergy={patient.known_allergies} cuurent_med={patient.currently_medications_or_supplements} current_symptoms={patient.current_Symptoms_or_issue} 
                      current_symptom_detl={patient.current_symptoms_detail} smoke_tobacco_alcohol={patient.smokeing_or_tobacco_or_alcohol} physical_activity={patient.physically_Activety} diet={patient.diet}
                      mental_Health={patient.mental_Health} Immunization_History={patient.Immunization_History} women_Health={patient.women_Health} other_Health_Concerns={patient.other_Health_Concerns} current_symptoms_started={patient.current_symptoms_started} weight={patient.weight} userDetails={false}/>
                       
                        
                        {/* <IconButton className='bg-red-500' onClick={(e)=>{DeleteStaffButton(patient)}}>
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
          {PatientSelfList.length > 0 ? (
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
                    My Patient List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-medium">
                  See information about all patients
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
export default DoctorSelfPatientList;
