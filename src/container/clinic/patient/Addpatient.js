import React from "react";
import Index from "../../../components";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  Input,Select, Option,Stepper, Step,Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  typography,
  Alert,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewPatientAction, UpdatePatientAction,GetPatientListAction } from "../../../redux/Clinic/clinicActions";
import { useNavigate } from "react-router-dom";
import CheckboxExample from "./New Text Document";
import {
  UserIcon,
} from "@heroicons/react/24/outline";


const Addpatient = props => {
  const [open, setOpen] = useState(false);
  const [patientMemberDetails, setpatientMemberDetails] = React.useState(
    props.userDetails
  );
  const token = useSelector(state => state.login.accessToken);
  const [contactval, setcontactval] = useState(false);
  const addpatient = useSelector(state => state.clinic.addpatient);
  const updatepatient = useSelector(state => state.clinic.updatepatient);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedfroup, setforupIsChecked] = useState(patientMemberDetails.smokeing_or_tobacco_or_alcohol);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  function chanagedateformate(date) {
    const inputDate = date;
  
    const dateParts = inputDate.split('-');
    
    const reformattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(reformattedDate);
    return reformattedDate 
    }

  const navigate = useNavigate();  

  function validatePhoneNumber(phoneNumber) {
    // Remove any non-digit characters from the input
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    // Check if the cleaned phone number is valid
    const phoneNumberRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    return phoneNumberRegex.test(cleanedPhoneNumber);
  }


  const UpdatePatientmember = () => {
    const x={
      "id": patientMemberDetails.id,
      "patient_First_Name":patientMemberDetails.patient_First_Name,
      "patient_Last_Name":patientMemberDetails.patient_Last_Name,
      "contect":patientMemberDetails.contect,
      "gender":patientMemberDetails.gender,
      "DOB":chanagedateformate(patientMemberDetails.DOB),
      "smokeing_or_tobacco_or_alcohol": isCheckedfroup,
      ...(patientMemberDetails.address !== '' && { "address": patientMemberDetails.address }),
      ...(patientMemberDetails.known_allergies !== '' && { "known_allergies": patientMemberDetails.known_allergies }),
      ...(patientMemberDetails.medical_Conditions !== '' && { "medical_Conditions": patientMemberDetails.medical_Conditions }),
      ...(patientMemberDetails.past_Surgeries_or_Hospitalizations !== '' && { "past_Surgeries_or_Hospitalizations": patientMemberDetails.past_Surgeries_or_Hospitalizations }),
      ...(patientMemberDetails.currently_medications_or_supplements !== '' && { "currently_medications_or_supplements": patientMemberDetails.currently_medications_or_supplements }),
      ...(patientMemberDetails.current_Symptoms_or_issue !== '' && { "current_Symptoms_or_issue": patientMemberDetails.current_Symptoms_or_issue }),
      ...(patientMemberDetails.current_symptoms_detail !== '' && { "current_symptoms_detail": patientMemberDetails.current_symptoms_detail }),
      ...(patientMemberDetails.physically_Activety !== '' && { "physically_Activety": patientMemberDetails.physically_Activety }),
      ...(patientMemberDetails.diet !== '' && { "diet": patientMemberDetails.diet }),
      ...(patientMemberDetails.mental_Health !== '' && { "mental_Health": patientMemberDetails.mental_Health }),
      ...(patientMemberDetails.Immunization_History !== '' && { "Immunization_History": patientMemberDetails.Immunization_History }),
      ...(patientMemberDetails.women_Health !== '' && { "women_Health": patientMemberDetails.women_Health }),
      ...(patientMemberDetails.other_Health_Concerns !== '' && { "other_Health_Concerns": patientMemberDetails.other_Health_Concerns }),
      ...(patientMemberDetails.weight !== undefined && { "weight": patientMemberDetails.weight }),
      ...(patientMemberDetails.current_symptoms_started !== null && { "current_symptoms_started": chanagedateformate(patientMemberDetails.current_symptoms_started)}),
    }
    if(validatePhoneNumber(patientMemberDetails.contect)==true){
    dispatch(UpdatePatientAction(x, token));
    handleOpen();
    }else{
      setcontactval(true)
    }
  };

 
if (updatepatient==true){
  console.log(updatepatient,"patientupdate")
  dispatch(GetPatientListAction(token));
  navigate('/clinic/patient/list')
}


  const AddpatientMember = () => {
    const formData = new URLSearchParams();
  

    const patientData ={
      "id": patientMemberDetails.id,
      "patient_First_Name":patientMemberDetails.patient_First_Name,
      "patient_Last_Name":patientMemberDetails.patient_Last_Name,
      "contect":patientMemberDetails.contect,
      "gender":patientMemberDetails.gender,
      "DOB":chanagedateformate(patientMemberDetails.DOB),
      "smokeing_or_tobacco_or_alcohol": isChecked ,
      ...(patientMemberDetails.address !== undefined && { "address": patientMemberDetails.address }),
      ...(patientMemberDetails.known_allergies !== undefined && { "known_allergies": patientMemberDetails.known_allergies }),
      ...(patientMemberDetails.medical_Conditions !== undefined && { "medical_Conditions": patientMemberDetails.medical_Conditions }),
      ...(patientMemberDetails.past_Surgeries_or_Hospitalizations !== undefined && { "past_Surgeries_or_Hospitalizations": patientMemberDetails.past_Surgeries_or_Hospitalizations }),
      ...(patientMemberDetails.currently_medications_or_supplements !== undefined && { "currently_medications_or_supplements": patientMemberDetails.currently_medications_or_supplements }),
      ...(patientMemberDetails.current_Symptoms_or_issue !== undefined && { "current_Symptoms_or_issue": patientMemberDetails.current_Symptoms_or_issue }),
      ...(patientMemberDetails.current_symptoms_detail !== undefined && { "current_symptoms_detail": patientMemberDetails.current_symptoms_detail }),
      ...(patientMemberDetails.physically_Activety !== undefined && { "physically_Activety": patientMemberDetails.physically_Activety }),
      ...(patientMemberDetails.diet !== undefined && { "diet": patientMemberDetails.diet }),
      ...(patientMemberDetails.mental_Health !== undefined && { "mental_Health": patientMemberDetails.mental_Health }),
      ...(patientMemberDetails.Immunization_History !== undefined && { "Immunization_History": patientMemberDetails.Immunization_History }),
      ...(patientMemberDetails.women_Health !== undefined && { "women_Health": patientMemberDetails.women_Health }),
      ...(patientMemberDetails.other_Health_Concerns !== undefined && { "other_Health_Concerns": patientMemberDetails.other_Health_Concerns }),
      ...(patientMemberDetails.weight !== undefined && { "weight": patientMemberDetails.weight }),
      ...(patientMemberDetails.current_symptoms_started !== undefined && { "current_symptoms_started": chanagedateformate(patientMemberDetails.current_symptoms_started) }),
    }
    
    if(validatePhoneNumber(patientMemberDetails.contect)==true){
    dispatch(AddNewPatientAction(patientData, token));
    handleOpen();
    }else{
      setcontactval(true)
    }
  };

  
if (addpatient==true){
  console.log(addpatient,"chkaddpatient")
  dispatch(GetPatientListAction(token));
  navigate('/clinic/patient/list')
}

   
  const onChange = e => {
    setpatientMemberDetails({
      ...patientMemberDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCheckboxChangeforup = (event) => {
    setforupIsChecked(event.target.checked);
  };

  const handlealert = ()=>{
    if(contactval==true){
      return  <Alert
      color="red"
      className="mb-2 mt-2"
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      icon={
        <Index.InformationCircleIcon
          strokeWidth={2}
          className="h-6 w-6"
        />
      }
    >
    plz give valid contact No.
    </Alert>
    }
  }

  let a=false
// const handleDisable_btn= ()=> {
if(typeof(patientMemberDetails.patient_First_Name)==='undefined'){
    a=true
  }else if(typeof(patientMemberDetails.patient_Last_Name)==='undefined'){
    a=true
  }else if(typeof(patientMemberDetails.contect)==='undefined'){
    a=true
  }
  else if(typeof(patientMemberDetails.DOB)==='undefined'){
    a=true
  }else if(typeof(patientMemberDetails.gender)==='undefined'){
    a=true
  }
  else if(patientMemberDetails.patient_First_Name==""){
    a=true
  }else if(patientMemberDetails.patient_Last_Name==""){
    a=true
  }else if(patientMemberDetails.contect==""){
    a=true
  }else if(patientMemberDetails.DOB==""){
    a=true
  }else if(patientMemberDetails.gender==""){
    a=true
  }

  const handleDisable_btn= ()=> {
    if (a==true){
      return true
    }
  }
  

  // select value

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];
  
 
  // staper const

  console.log(isChecked,"chksmok")

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  
  console.log(props.userDetails,"chksmok")

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient"
        color={props.userDetails ? "amber":"blue"}>
          {props.userDetails ? "Update Patient" : "Add Patient"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
          {props.userDetails ? "Update Patient" : "Add Patient"}
        </DialogHeader>
        {/* <DialogBody divider> */}
      <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          {/* <div className="absolute -bottom-[4.5rem] w-max text-center">
           
          </div> */}
        </Step>
        <Step onClick={() => setActiveStep(1)}>
            <Index.MedicalServicesOutlined className="h-5 w-5"/>
          {/* <CogIcon className="h-5 w-5" /> */}
          <div className="absolute -bottom-[4.5rem] w-max text-center ">
            <Typography
              variant="h6"
              color={"black"}
              className={activeStep === 1 ? "":"hidden"}
            >
              Medical Details
            </Typography>
            <Typography
              variant="h6"
              color={"black"}
              className={activeStep === 0 ? "":"hidden"}
            >
              Personal Details
            </Typography>
            <Typography
              variant="h6"
              color={"black"}
              className={activeStep === 2 ? "":"hidden"}
            >
              Past Details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
         
          <Index.AddchartIcon className="h-5 w-5"/>
       
        </Step>
      </Stepper>
       {/* first form */}
      <div className={activeStep === 0 ? "":"hidden"}>
       <Fragment>
       <div className="flex flex-col space-y-4 mt-24">
       <div className="flex flex-row space-x-4">
       <Input
                label="First Name"
                type="text"
                color="lightBlue"
                size="regular"
                name="patient_First_Name"
                value={patientMemberDetails.patient_First_Name}
                outline={true}
                onChange={onChange}
                required
              />
         <Input
                label="Last Name"
                type="text"
                color="lightBlue"
                size="regular"
                name="patient_Last_Name"
                onChange={onChange}
                value={patientMemberDetails.patient_Last_Name}
                outline={true}
                required
              />
         </div>
       <div className="flex flex-row space-x-4">
       <Input
                label="Contact"
                type="text"
                color="lightBlue"
                size="regular"
                name="contect"
                value={patientMemberDetails.contect}
                outline={true}
                onChange={onChange}
                required
              />
         
          <select className="w-full px-2 py-[7.5px] rounded-md border-solid border-2 border-lightBlue-1000" label="Gender" name="gender" value={patientMemberDetails.gender} onChange={onChange} id="mySelect" required>
            <option disabled selected>Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
   
         </div>
         <div className="">
       <Input
                label="Address"
                type="text"
                color="lightBlue"
                size="regular"
                name="address"
                value={patientMemberDetails.address}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="flex flex-row space-x-4">
       <Input
                label='DOB'
                // placeholder="DOB"
                type="date"
                color="lightBlue"
                size="regular"
                name="DOB"
                inputFormat="MM/dd/yyyy"
                value={patientMemberDetails.DOB}
                outline={true}
                onChange={onChange}
                pattern="\d{2}-\d{2}-\d{4}"
                required
              />
         <Input
                label="known Allergies"
                type="text"
                color="lightBlue"
                size="regular"
                name="known_allergies"
                onChange={onChange}
                value={patientMemberDetails.known_allergies}
                outline={true}
              />
         </div>
         <div className="flex flex-row space-x-4">
       <Input
                label="weight"
                type="text"
                color="lightBlue"
                size="regular"
                name="weight"
                value={patientMemberDetails.weight}
                outline={true}
                onChange={onChange}
              />
         <Input
                label="Diet"
                type="text"
                color="lightBlue"
                size="regular"
                name="diet"
                onChange={onChange}
                value={patientMemberDetails.diet}
                outline={true}
              />
         </div>
       </div>
       </Fragment>
      </div>
      {/* second form */}
      <div className={activeStep === 1 ? "":"hidden"}>
       <Fragment>
       <div className="flex flex-col space-y-4 mt-24">
       <div className="flex flex-row space-x-4">

      <div className="flex items-center ... justify-evenly ... flex-row space-x-4 w-full border-2 border-black-600 border-blue-gray-100 rounded-lg h-10">
      <Input
                label="Medical Conditions"
                type="text"
                color="lightBlue"
                size="regular"
                name="medical_Conditions"
                value={patientMemberDetails.medical_Conditions}
                outline={true}
                onChange={onChange}
              />
      
          </div>
          <Input
                label="Physical Activity"
                type="text"
                color="lightBlue"
                size="regular"
                name="physically_Activety"
                value={patientMemberDetails.physically_Activety}
                outline={true}
                onChange={onChange}
              />
      </div>
       {/* <div className="">
       <Input
                label="Medical Conditions"
                type="text"
                color="lightBlue"
                size="regular"
                name="medical_Conditions"
                value={patientMemberDetails.medical_Conditions}
                outline={true}
                onChange={onChange}
              />
         </div> */}
         <div className="">
       <Input
                label="Past Surgeries or Hospitalization"
                type="text"
                color="lightBlue"
                size="regular"
                name="past_Surgeries_or_Hospitalizations"
                value={patientMemberDetails.past_Surgeries_or_Hospitalizations}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
       <Input
                label="Currently Medications or Supplements"
                type="text"
                color="lightBlue"
                size="regular"
                name="currently_medications_or_supplements"
                value={patientMemberDetails.currently_medications_or_supplements}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
       <Input
                label="Current Symptoms Or Issue"
                type="text"
                color="lightBlue"
                size="regular"
                name="current_Symptoms_or_issue"
                value={patientMemberDetails.current_Symptoms_or_issue}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
       <Input
                label="Current Symptoms Detail"
                type="text"
                color="lightBlue"
                size="regular"
                name="current_symptoms_detail"
                value={patientMemberDetails.current_symptoms_detail}
                outline={true}
                onChange={onChange}
              />
         </div>
       </div>
       </Fragment>
      </div>
       {/* third form */}
       <div className={activeStep === 2 ? "":"hidden"}>
       <Fragment>
       <div className="flex flex-col space-y-4 mt-24">
       <div className="flex flex-row space-x-4">

        <div className="flex items-center ... justify-evenly ... flex-row space-x-4 w-full border-2 border-black-600 border-blue-gray-100 rounded-lg h-10">

       <input
                type="checkbox"
                color="lightBlue"
                size="regular"
                name="smokeing_or_tobacco_or_alcohol"
                value={patientMemberDetails.smokeing_or_tobacco_or_alcohol}
                outline={true}
                checked={props.userDetails ? isCheckedfroup : isChecked}
                onChange={props.userDetails ? handleCheckboxChangeforup :handleCheckboxChange}
                />
              <p className="py-3 pr-0 text-sm/[15px]" style={{margin:0}}>smoking or tobacco or alcohol</p>
              {/* <CheckboxExample/> */}
            </div>
            <Input
                label='Current Symptoms Started'


                type="date"
                color="lightBlue"
                size="regular"
                name="current_symptoms_started"
                value={patientMemberDetails.current_symptoms_started}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
         <Input
                label="Other Health Concerns"
                type="text"
                color="lightBlue"
                size="regular"
                name="other_Health_Concerns"
                value={patientMemberDetails.other_Health_Concerns}
                outline={true}
                onChange={onChange}
              />
        </div>
               <div className="">
       <Input
                label="Mental Health"
                type="text"
                color="lightBlue"
                size="regular"
                name="mental_Health"
                value={patientMemberDetails.mental_Health}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
       <Input
                label="Immunization History"
                type="text"
                color="lightBlue"
                size="regular"
                name="Immunization_History"
                value={patientMemberDetails.Immunization_History}
                outline={true}
                onChange={onChange}
              />
         </div>
         <div className="">
       <Input
                label="Woman Health"
                type="text"
                color="lightBlue"
                size="regular"
                name="women_Health"
                value={patientMemberDetails.women_Health}
                outline={true}
                onChange={onChange}
              />
              
         </div>
       </div>
       </Fragment>
      </div>
      <div className="flex justify-between mt-11">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button className={activeStep === 2 ? "hidden":""} onClick={handleNext} disabled={handleDisable_btn()}>
          Next
        </Button>
        <Button className={activeStep === 2 ? "":"hidden"} onClick={props.userDetails ? UpdatePatientmember : AddpatientMember} >
        <span>
              {props.userDetails ?"Update Patient" : "Add Patient"}
        </span>
        </Button>
      </div>
      {handlealert()}
      </div>
     
      </Dialog>
    </Fragment>
  );
};

export default Addpatient;
