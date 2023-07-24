import React,{ useRef } from "react";
import Index from "../../../components";
import { Fragment, useState } from "react";
import html2canvas from "html2canvas";
import { useReactToPrint } from 'react-to-print'
import jsPDF from "jspdf";
import dummy from './download.jpg'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  Input,
  Avatar,
  Card
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { GetDoctorSelfPatientAction} from '../../../redux/Doctor/doctorAction'
import { GetMedicineListAction} from '../../../redux/Clinic/clinicActions'
import { Height, Margin } from "@mui/icons-material";
// import { AddNewStaffAction, UpdateStaffAction } from "../../../redux/Clinic/clinicActions";



const PrescriptionPdf = props => {
  const [open, setOpen] = useState(false);
  const accessToken = useSelector(state => state.login.accessToken);
  const userDetail = useSelector(state => state.login.userDetail)
  // console.log(userDetail,"Detail")
  const dispatch = useDispatch();
  // const handleOpen = () => setOpen(!open);
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const TABLE_HEAD = ["Medicine Name", "Dosage", "Frequency","Duration"];

  function calculateAge(dateOfBirth) {
  var today = new Date(); // Current date
  var birthDate = new Date(dateOfBirth); // Convert DOB to Date object

  var age = today.getFullYear() - birthDate.getFullYear(); // Calculate the age

  // Check if the birthday hasn't occurred yet this year
  var hasBirthdayPassed = today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--; // Subtract 1 from the age if the birthday hasn't passed yet
  }

  return age;
}

  var dob = props.patient_DOB; // Date of Birth in "YYYY-MM-DD" format
  var age = calculateAge(dob);
  console.log(age)

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert('print success')
  });

  const handleButtonClick = () => {
    closeDialog();
    handlePrint();
  }

  React.useEffect(() => {
    dispatch(GetMedicineListAction(accessToken))
  }, [])

  console.log(props, "aaaa")
  return (
    <Fragment>
      <Button onClick={openDialog} className="bg-[#ffe082] text-blue-gray">Prescription PDF
        {/* {props.userDetails ? "Edit Staff" : "Add Staff"} */}
      </Button>
      <Dialog open={open}  className="h-[40rem] overflow-scroll" size="lg" handler={openDialog}>
        <div ref={componentRef} style={{width:'100%'}}>
        {/* <DialogHeader> */}
        <div class="grid grid-cols-2 h-36 bg-[#dcfce7] text-teal-900">
        <div>
         <Typography className="font-serif text-4xl mt-6 ml-8 font-semibold">{userDetail.clinic_info.clinic_Name}</Typography>
         <Typography className="font-serif text-xl ml-8 font-bold mt-2">Dr. {userDetail.first_Name} {userDetail.last_Name}</Typography>
         <Typography className="font-semibold ml-8 text-[10px]">{userDetail.qualification}</Typography>
         
        </div>
        <div class="grid justify-items-end"><Avatar src={ "https://sagar.pythonanywhere.com"+ userDetail.clinic_info.logo} alt="avatar" size="xxl" className=" mt-5 mr-8" /></div>
        </div>
        {/* </DialogHeader> */}
        <DialogBody divider>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3 text-right">Date: {props.date_of_appointment} </Typography>
        <Typography className="text-center mt-3 text-2xl font-serif font-bold text-light-green-600">Patient Information </Typography>
        <div className="grid grid-cols-2 mt-7">
        <div className=" grid grid-cols-2">
        <div className="ml-20">
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Name :</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Weight :</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Address :</Typography>
        {/* <Typography className="font-bold text-[12px] text-teal-900 mt-3">Medicine Name :</Typography> */}
        </div>
        <div className=" ml-14">
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.patient_First_Name} </Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.weight ? props.weight+" kg": "NA"}</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.address}</Typography>
        {/* <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.user}</Typography> */}
        </div>
        </div>
        <div className=" grid grid-cols-2">
        <div className=" ml-28">
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Gender :</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Date Of Birth:</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">Contact :</Typography>
        {/* <Typography className="font-bold text-[12px] text-teal-900 mt-3">Medicine Name :</Typography> */}
        </div>
        <div className=" ml-24">
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.gender}</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{age} Years</Typography>
        <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.contect}</Typography>
        {/* <Typography className="font-bold text-[12px] text-teal-900 mt-3">{props.user}</Typography> */}
        </div>
        </div>
        </div>
        <Typography className="text-center mt-12 text-2xl font-serif font-bold text-light-green-600">Prescribed Medication</Typography>
      <table className="w-full min-w-max table-auto text-left mt-10">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className=" bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold text-[14px] leading-none opacity-80 "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {props.user.map((myinfo,inde) =>{
            return(
            <tr key={inde} className="even:bg-blue-gray-50/50">
              <td className="p-4 ">
                <Typography variant="small" color="blue-gray" className="font-bold text-[12px] opacity-90">
                {myinfo.tablet}
                </Typography>
              </td>
              <td className="p-4 ">
                <Typography variant="small" color="blue-gray" className="font-bold text-[12px] opacity-90">
                  {myinfo.dosage}
                </Typography>
              </td>
              <td className="p-4 border">
                <Typography variant="small" color="blue-gray" className="font-bold text-[12px] opacity-90">
                  {myinfo.frequency}
                </Typography>
              </td>
              <td className="p-4 border">
                <Typography variant="small" color="blue-gray" className="font-bold text-[12px] opacity-90">
                  {myinfo.duration}
                </Typography>
              </td>
            </tr>
          )
        }) }
        </tbody>
      </table>
        </DialogBody>
         <div class="grid grid-cols-2 bg-[#dcfce7] text-teal-900 h-12 mt-28">
          <div>
          <Typography className="font-serif ml-3 mt-2 font-semibold"><Index.LocationOnIcon className="mr-2"/> Address : {userDetail.clinic_info.Address}</Typography>
          </div>
          <div>
          <Typography className="font-serif text-right mr-3 mt-2 font-semibold"><Index.CallIcon className="mr-2"/>Phone : {userDetail.clinic_info.contact}</Typography>
          </div>
         </div>
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleButtonClick}>
            <span>
            save as pdf
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PrescriptionPdf;
