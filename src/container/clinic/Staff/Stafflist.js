import React, { useState} from 'react'
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
import { DeleteStaff, GetStaffListAction } from '../../../redux/Clinic/clinicActions';
import AddStaff from './AddStaff';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GetStaffList } from '../../../redux/services/Clinic';


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

const TABLE_HEAD = ["Profile","Name", "Email","Contact", ""];


const StafList = () => {
  const accessToken = useSelector(state => state.login.accessToken)
  const staffList = useSelector(state => state.clinic.staffList)
  const chkdel = useSelector(state => state.clinic.stfdel)
  const [open, setOpen] = useState(false);

  const [search, setSearch ] = useState('');
  console.log(search)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  let x=staffList

if (typeof(staffList)!="undefined"){

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = staffList.slice(indexOfFirstItem, indexOfLastItem);
x=currentItems
}

// console.log(staffList,"chkstafff")
  // const [active, setActive] = React.useState(1);
 
  // const next = () => {
  //   if (active === 10) return;
 
  //   setActive(active + 1);
  // };
 
  // const prev = () => {
  //   if (active === 1) return;
 
  //   setActive(active - 1);
  // };
  const handleOpen = () => setOpen(!open);

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
    dispatch(DeleteStaff(data, accessToken))   
   
    // handleOpen();
    // navigate('/clinic/staff/list')
  }

if (chkdel==true){
console.log(chkdel,"ckdel")
  dispatch(GetStaffListAction(accessToken));
  navigate('/clinic/staff/list')
}


  React.useEffect(() => {
    dispatch(GetStaffListAction(accessToken))
  }, [])

  if(staffList != null){
  return (
    <>
      <ClinicLayout>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h3" color="blue-gray" className="font-serif">{/*h3 className="font-serif"*/}
                  Clinic Staff List
                </Typography>
                <Typography color="gray" className="mt-1 font-serif text-lg">
                  See information about all staff members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm" color="blue-gray">
                  view all
                </Button> */}
                <AddStaff userDetails={false} />
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
              {staffList.length > 0 ? (
                  <>
              <tbody>
                
              {x && <>{x.filter((staff) =>{
                  return search.toLowerCase() === '' ? staff : staff.first_Name.toLowerCase().includes(search) || staff.contact.includes(search) || staff.email.includes(search);
                }).map((staff, index) => {
                  const isLast = index === staffList.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100";

                  return (
                    <tr key={staff.email}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-medium opacity-70">
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium opacity-70"
                          >
                            <img src={ "https://sagar.pythonanywhere.com/media/"+ staff.image_and_logo} alt="" className='h-12 w-12'/>
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-medium opacity-70">
                              {staff.first_Name}  {staff.last_Name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {staff.designation}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-medium opacity-70">
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium opacity-70"
                          >
                            {staff.email}
                          </Typography>
                        </div>
                      </td>
                      {/* <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={staff.is_active ? "Active" : "Inactive"}
                            color={staff.is_active ? "green" : "red"}
                          />
                        </div>
                      </td> */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-medium opacity-70">
                          {staff.contact}
                        </Typography>
                        <p className='text-sm text-gray-700'>{staff.address}</p>

                      </td>
                      <td className={`${classes} flex space-x-4 flex-row p-6`} >
                        <AddStaff userDetails={staff} />
                        <IconButton className='bg-red-500' onClick={(e)=>{DeleteStaffButton(staff)}}>
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
          {staffList.length>0 ? (
            <>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
            {/* <Typography variant="small" color="blue-gray" className="font-normal">
            Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
            <strong className="text-blue-gray-900">10</strong>
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm" onClick={prev} disabled={active === 1}>
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm" onClick={next} disabled={active===10}>
                Next
              </Button>
            </div> */}
          </CardFooter>
        </>
          ): <>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
          </>}
        </Card>


      </ClinicLayout>
    </>
  )
} else {
return(
  <>
 
            <ClinicLayout>
            <div class="flex-1" className='h-full w-full float-left'>
          
              <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h3" color="blue-gray" className="font-serif">{/*h3 className="font-serif"*/}
                  Clinic Staff List
                </Typography>
                <Typography color="gray" className="mt-1 font-serif text-lg">
                  See information about all staff members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm" color="blue-gray">
                  view all
                </Button> */}
                <AddStaff userDetails={false} />
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
  </>
)}
}

export default StafList;