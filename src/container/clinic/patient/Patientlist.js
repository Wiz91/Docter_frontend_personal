import React, { useState } from 'react'
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
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteStaff, GetPatientListAction } from '../../../redux/Clinic/clinicActions';
import Addpatient from './Addpatient';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ViewMorePatientDetails from './ViewMorePatientDetails';

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Active",
//     value: "monitored",
//   },
//   {
//     label: "Inactive",
//     value: "unmonitored",
//   },
// ];

const TABLE_HEAD = ["Patient Name", "DOB", "Gender", "Address & Contact",""];


const PatientList = () => {
  const accessToken = useSelector(state => state.login.accessToken)
  const PatientList = useSelector(state => state.clinic.PatientList)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  let x=PatientList

  if (typeof(PatientList)!="undefined"){
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PatientList.slice(indexOfFirstItem, indexOfLastItem);
  x=currentItems
  console.log(currentItems)
  }

//  console.log(PatientList,"chkpalist")

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  


  const DeleteStaffButton = (staffId) => {
    let data = {
      id: staffId
    }
    dispatch(DeleteStaff(data, accessToken, navigate))
  }

  const [search, setSearch ] = useState('');
  console.log(search)

  React.useEffect(() => {
    dispatch(GetPatientListAction(accessToken))
  }, [])
  if(PatientList != null){
  return (
    <>
      <ClinicLayout>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h3" color="blue-gray" className="font-serif">
                  Clinic Patient List
                </Typography>
                <Typography color="gray" className="mt-1 font-serif text-lg">
                  See information about all patient members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" color="blue-gray" size="sm">
                  view all
                </Button> */}
                <Addpatient userDetails={false} />
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
              {PatientList.length > 0 ? (
                  <>
              <tbody>
                {x && <>{x.filter((patient) =>{
                  return search.toLowerCase() === '' ? patient : patient.patient_First_Name.toLowerCase().includes(search) || patient.patient_Last_Name.toLowerCase().includes(search) || patient.contect.includes(search)
                }).map((patient, index) => {
                  const isLast = index === PatientList.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100";

                  return (
                    <tr key={patient.DOB}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
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
                          {patient.contect}
                        </Typography>
                        <p className='text-sm text-gray-700'>{patient.address}</p>

                      </td>
                      <td className={`${classes} flex space-x-4 flex-row p-6`} >
                      <ViewMorePatientDetails pat_id={patient.id} medical_condition={patient.medical_Conditions} pastsurgery={patient.past_Surgeries_or_Hospitalizations} knownallergy={patient.known_allergies} cuurent_med={patient.currently_medications_or_supplements} current_symptoms={patient.current_Symptoms_or_issue} 
                      current_symptom_detl={patient.current_symptoms_detail} smoke_tobacco_alcohol={patient.smokeing_or_tobacco_or_alcohol} physical_activity={patient.physically_Activety} diet={patient.diet}
                      mental_Health={patient.mental_Health} Immunization_History={patient.Immunization_History} women_Health={patient.women_Health} other_Health_Concerns={patient.other_Health_Concerns} current_symptoms_started={patient.current_symptoms_started} weight={patient.weight} userDetails={false}/>
                        <Addpatient userDetails={patient} />
                        
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
          {PatientList.length > 0 ? (
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
                <Typography variant="h3" color="blue-gray" className="font-serif">
                  Clinic Patient List
                </Typography>
                <Typography color="gray" className="mt-1 font-serif text-lg">
                  See information about all patient members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" color="blue-gray" size="sm">
                  view all
                </Button> */}
                <Addpatient userDetails={false} />
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
            </ClinicLayout>
  {/* </div> */}
  </>
)
}
export default PatientList;
