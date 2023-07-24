import React,{ useRef } from "react";
import Index from "../../../components";
import { Fragment, useState } from "react";
import html2canvas from "html2canvas";
import { useReactToPrint } from 'react-to-print'
import PrescriptionPdf from "./PrescriptionPdf";
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
import { DeleteOutline } from '@mui/icons-material';
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { GetDoctorSelfPatientAction} from '../../../redux/Doctor/doctorAction'
import { GetMedicineListAction} from '../../../redux/Clinic/clinicActions'
import { Height, Margin } from "@mui/icons-material";
import { duration } from "@mui/material";
import { tab } from "@testing-library/user-event/dist/tab";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { AddNewStaffAction, UpdateStaffAction } from "../../../redux/Clinic/clinicActions";



const CreatePrescription = props => {
  const [open, setOpen] = useState(false);
  const TABLE_HEAD = ["Medicine Name", "Dosage", "Frequency", "Duration","Delete Medicine"];
  const [medication, setMedication ] = useState([])
  const [medic, setMedic] = useState({ tablet: "", dosage: "",frequency: "",duration: "",});
  const accessToken = useSelector(state => state.login.accessToken);
  const medicineList = useSelector(state => state.clinic.medicineList)
  // console.log(medicineList,"med")

  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert('print success')
  });

  console.log(props)
  const handleChange = (event) =>{
    setMedic({
      ...medic,
    [event.target.name]: event.target.value});
  }

  let {tablet, dosage, frequency, duration}=medic;
  const changeHandle = () => {
    setMedication([...medication,{tablet,dosage,frequency,duration}])
    setMedic({tablet:"", dosage:"", frequency:"",duration:""})
  }

  // console.log(medication, "post")
  // console.log(medic,"pre")
  
 const isButtonEnabled = medic.tablet !== '' && medic.dosage !== '' && medic.frequency !== '' && medic.duration !== '';

  // Function to delete a row
  const deleteRow = (index) => {
    const updatedRows = [...medication];
    updatedRows.splice(index, 1);
    setMedication(updatedRows);
  };

  React.useEffect(() => {
    dispatch(GetMedicineListAction(accessToken))
  }, [])

  return (
    <Fragment>
      <Button onClick={handleOpen} className="bg-[#ffe082] text-blue-gray">Create Prescription
        {/* {props.userDetails ? "Edit Staff" : "Add Staff"} */}
      </Button>
      <Dialog open={open} className="h-[30rem] overflow-scroll"  size="lg" handler={handleOpen}>
        <DialogHeader className=" font-semibold text-2xl">
        Create Prescription
          {/* {props.userDetails ? "Update Staff Member" : "Add Staff Memeber"} */}
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4" id="form-container">
          <div className="flex flex-row space-x-2">
          <Input
                // placeholder="Search..."
                label="Search Medicine"
                type="text"
                color="green"
                size="regular"
                name="tablet"
                onChange={handleChange}
                value={medic.tablet}
                outline={true}
                autoComplete="off"
                list="data"
                // icon={<KeyboardArrowDownIcon className="h-5 w-5" />}
              />
          <datalist className="w-full px-2 py-[7.5px]  rounded-md border-solid border-2 border-gray-400 bg-white text-sm font-semibold" label="Medician" id="data">
            {/* <option selected>Select Medicins</option> */}
            {medicineList && <>{medicineList.map((med, index) => {
                  return(
                <option >{med.name_of_medicine}</option>
                  )
              })} </>}
          </datalist>
          <Input
                // placeholder="Dosage"
                label="Dosage"
                type="text"
                color="green"
                size="regular"
                name="dosage"
                onChange={handleChange}
                value={medic.dosage}
                outline={true}
                autoComplete="off"
                
              />
          </div>
            <div className="flex flex-row space-x-2">
         
              <Input
                // placeholder="Frequency"
                label="Frequency"
                type="text"
                color="green"
                size="regular"
                name="frequency"
                onChange={handleChange}
                value={medic.frequency}
                outline={true}
                autoComplete="off"
              />
               <Input
                // placeholder="Duration"
                label="Duration"
                type="text"
                color="green"
                size="regular"
                name="duration"
                onChange={handleChange}
                value={medic.duration}
                outline={true}
                autoComplete="off"
              />
                {/* <Button color="green" onClick={changeHandle}>Add</Button> */}
            </div>
            <Button color="green" onClick={changeHandle} className="w-[15%] mx-auto" disabled={!isButtonEnabled}>Add</Button>
          </div>
          {/* <Card className="h-full w-full"> */}
      <table className="w-full min-w-max table-auto text-left mt-7">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {medication.map((info,index) =>{
            return(
              <tr key={index} className="even:bg-blue-gray-50/50 text-center">
                <td className="border p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal  opacity-90 text-blue-gray-600">
                   {info.tablet}
                  </Typography>
                </td>
                <td className="border p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal  opacity-90 text-blue-gray-600">
                    {info.dosage}
                  </Typography>
                </td>
                <td className="border p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal  opacity-90 text-blue-gray-600">
                   {info.frequency}
                  </Typography>
                </td>
                <td className="border p-4">
                  <Typography  variant="small" color="blue-gray" className="font-normal  opacity-90 text-blue-gray-600">
                    {info.duration}
                  </Typography>
                </td>
                <td className="border p-4">
                {/* <Button onClick={() => deleteRow(index)} color="red">Delete</Button> */}
                <IconButton size="sm" className='bg-red-600 items-center'onClick={() => deleteRow(index)}>
                  <DeleteOutline />
                </IconButton>
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    {/* </Card> */}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <PrescriptionPdf user={medication} patient_First_Name={props.patient_First_Name} gender={props.gender} address={props.address} contect={props.contect} date_of_appointment={props.date_of_appointment} patient_DOB={props.patient_DOB} weight={props.weight}/>
          {/* <Button variant="gradient" color="green">
            <span>
            save as pdf
              {props.userDetails ? "Update staff" : "Add staff"}
            </span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default CreatePrescription;
