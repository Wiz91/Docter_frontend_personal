import React from "react";
// import Index from "../../../components";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  // IconButton,
  // Typography,
  Input,
  Alert,
  Typography,
} from "@material-tailwind/react";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewDoctorAction, UpdatedoctorAction,GetDoctorListAction } from "../../../redux/Doctor/doctorAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import Index from "../../../components";

const AddDoctor = props => {
  const [open, setOpen] = useState(false);
  const [doctorMemberDetails, setdoctorMemberDetails] = React.useState(
    props.userDetails
  );
  const [preview, setPreview] = useState('');
  const token = useSelector(state => state.login.accessToken);
  const adddoc = useSelector(state => state.doctor.adddoc);
  const updoc = useSelector(state => state.doctor.updoc);
  const navigate = useNavigate();
  const [show, toogleShow] = useState(false);
  const Loader = () => {
  if(adddoc == true){
    console.log("updated_doctor",adddoc)
    toogleShow(false)
  }
  return(
    <>
      <div className="w-full h-96 flex items-center justify-center bg-white opacity-75  -mt-96">
        <Spinner className="h-16 w-16 text-blue-500/10 my-60" />
      </div>    
    </>
  )
}
  
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  const [selectedFile, setSelectedFile] = useState();
  const [emailval, setemailval] = useState(false);
  const [contactval, setcontactval] = useState(false); 


  function chanagedateformate(date) {
    const inputDate = date;
  
    const dateParts = inputDate.split('-');
    
    const reformattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(reformattedDate);
    return reformattedDate 
    }

  
    function validatePassword(password) {
      // Check if the password meets the required criteria
      const minLength = 8; // Minimum length requirement
      const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
      const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
      const hasNumber = /\d/.test(password); // At least one digit
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password); // At least one special character
    
      // Perform the validation
      if (password.length < minLength) {
        return false; // Password is too short
      }
      if (!hasUppercase) {
        return false; // Password does not contain an uppercase letter
      }
      if (!hasLowercase) {
        return false; // Password does not contain a lowercase letter
      }
      if (!hasNumber) {
        return false; // Password does not contain a digit
      }
      if (!hasSpecialChar) {
        return false; // Password does not contain a special character
      }
    
      return true; // Password is valid
    }
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function validatePhoneNumber(phoneNumber) {
      // Remove any non-digit characters from the input
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      // Check if the cleaned phone number is valid
      const phoneNumberRegex = /^\d{10}$/; // Assumes a 10-digit phone number
      return phoneNumberRegex.test(cleanedPhoneNumber);
    }
  
    // const default_image=()=>{
    //   if (typeof(selectedFile)!="undefined"){
    //    return selectedFile
    //   }
    // }  

  const Updatedoctormember = () => {
    const formData = new URLSearchParams();
    formData.append("first_Name", doctorMemberDetails.first_Name);
    formData.append("last_Name", doctorMemberDetails.last_Name);
    formData.append("email", doctorMemberDetails.email);
    formData.append("contact", doctorMemberDetails.contact);
    formData.append("designation", doctorMemberDetails.designation);
    formData.append("experience", doctorMemberDetails.experience);
    formData.append("qualification", doctorMemberDetails.qualification);
    formData.append("specialist", doctorMemberDetails.specialist);
    formData.append("image_and_logo",selectedFile);
    formData.append("Address",doctorMemberDetails.Address);
    formData.append("Gender",doctorMemberDetails.gender);
    formData.append("DOB",chanagedateformate(doctorMemberDetails.DOB));


    const Docdata ={
      "id":doctorMemberDetails.id,
      "first_Name": doctorMemberDetails.first_Name,
      "last_Name": doctorMemberDetails.last_Name,
      "email": doctorMemberDetails.email,
      "password": doctorMemberDetails.password,
      "contact": doctorMemberDetails.contact,
      "designation": doctorMemberDetails.designation,
      "experience": doctorMemberDetails.experience,
      "qualification": doctorMemberDetails.qualification,
      "specialist": doctorMemberDetails.specialist,
      // "password2": doctorMemberDetails.password,
      "Address":doctorMemberDetails.Address,
      "gender":doctorMemberDetails.gender,
      "DOB":chanagedateformate(doctorMemberDetails.DOB),
      ...(selectedFile !== undefined && { "image_and_logo": selectedFile }),
    }
    
    if (validateEmail(doctorMemberDetails.email)==true){
      if(validatePhoneNumber(doctorMemberDetails.contact)==true){
      dispatch(UpdatedoctorAction(Docdata, token));
      toogleShow(true)
      handleOpen();
    }else{
      setcontactval(true)
      setemailval(false)
    }
  }else{
    setemailval(true)
  }


    // console.log(doctorMemberDetails,"passsss")
    // dispatch(UpdatedoctorAction(Docdata, token));
    // // handleOpen();
    // toogleShow(true)
    // console.log("toogleShow",show)
  };
 
if(updoc==true){
 console.log(updoc,"chkupdoc")
 dispatch(GetDoctorListAction(token));
 navigate('/clinic/doctors/list')
}

  
  const AdddoctorMember = () => {
    const formData = new URLSearchParams();
    formData.append("first_Name", doctorMemberDetails.first_Name);
    formData.append("last_Name", doctorMemberDetails.last_Name);
    formData.append("email", doctorMemberDetails.email);
    formData.append("password", doctorMemberDetails.password);
    formData.append("contact", doctorMemberDetails.contact);
    formData.append("designation", doctorMemberDetails.designation);
    formData.append("experience", doctorMemberDetails.experience);
    formData.append("qualification", doctorMemberDetails.qualification);
    formData.append("specialist", doctorMemberDetails.specialist);
    formData.append("password2", doctorMemberDetails.password);
    formData.append("image_and_logo",selectedFile);
    formData.append("Address",doctorMemberDetails.Address);
    formData.append("Gender",doctorMemberDetails.gender);
    formData.append("DOB",chanagedateformate(doctorMemberDetails.DOB));
    
  
    const data ={
      "first_Name": doctorMemberDetails.first_Name,
      "last_Name": doctorMemberDetails.last_Name,
      "email": doctorMemberDetails.email,
      "password": doctorMemberDetails.password,
      "contact": doctorMemberDetails.contact,
      "designation": doctorMemberDetails.designation,
      "experience": doctorMemberDetails.experience,
      "qualification": doctorMemberDetails.qualification,
      "specialist": doctorMemberDetails.specialist,
      "password2": doctorMemberDetails.password,
      "Address":doctorMemberDetails.Address,
      "gender":doctorMemberDetails.gender,
      "DOB":chanagedateformate(doctorMemberDetails.DOB),
      ...(selectedFile !== undefined && { "image_and_logo": selectedFile }),
    }
    
    if (validateEmail(doctorMemberDetails.email)==true){
      if(validatePhoneNumber(doctorMemberDetails.contact)==true){
      dispatch(AddNewDoctorAction(data, token));
      handleOpen();
    }else{
      setcontactval(true)
      setemailval(false)
    }
  }else{
    setemailval(true)
  }
    
   
  };

if (adddoc==true){
 console.log(adddoc,"chkadddoc")
 dispatch(GetDoctorListAction(token));
 navigate('/clinic/doctors/list')
}

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };


  const onChange = e => {
    setdoctorMemberDetails({
      ...doctorMemberDetails,
      [e.target.name]: e.target.value
    });
  };

  let a=false
// const handleDisable_btn= ()=> {
if(typeof(doctorMemberDetails.first_Name)==='undefined'){
    a=true
  } else if(typeof(doctorMemberDetails.last_Name)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.email)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.contact)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.designation)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.experience)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.qualification)=='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.specialist)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.Address)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.gender)==='undefined'){
    a=true
  }else if(typeof(doctorMemberDetails.DOB)==='undefined'){
    a=true
  }
  else if(doctorMemberDetails.first_Name==""){
    a=true
  }else if(doctorMemberDetails.last_Name==""){
    a=true
  }else if(doctorMemberDetails.email==""){
    a=true
  }else if(doctorMemberDetails.contact==""){
    a=true
  }else if(doctorMemberDetails.designation==""){
    a=true
  }else if(doctorMemberDetails.specialist==""){
    a=true
  }else if(doctorMemberDetails.qualification==""){
    a=true
  }else if(doctorMemberDetails.Address==""){
    a=true
  }else if(doctorMemberDetails.gender==""){
    a=true
  }else if(doctorMemberDetails.experience==""){
    a=true
  }else if(doctorMemberDetails.DOB==""){
    a=true
  }else if(props.userDetails==false){
    if(typeof(doctorMemberDetails.password)==='undefined'){
    a=true
  }else if(validatePassword(doctorMemberDetails.password)==false){
    a=true
  }else if(doctorMemberDetails.password==""){
    a=true
  }
}

console.log(doctorMemberDetails.password,"work")  

const handleDisable_btn= ()=> {
  if (a==true){
    return true
  }
}

const handlealert = ()=>{
  if (emailval==true){
  return  <Alert
  className="mb-2"
  color="red"
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
plz give the valid email format 
</Alert>
  }else if(contactval==true){
    return  <Alert
    color="red"
    className="mb-2"
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

const handle_password_alert=()=>{
  if (props.userDetails==false){
  if (typeof(doctorMemberDetails.password)!="undefined"){
    if(validatePassword(doctorMemberDetails.password)==false){
      return   <Alert
      className="mb-2"
      variant="gradient"
      color="red"
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
      <Typography className="font-medium">Ensure that these password requirements are met:</Typography>
      <ul class="mt-2 ml-2 list-disc list-inside">
        <li>At least 8 characters</li>
        <li>At least one uppercase character</li>
        <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
      </ul>
    </Alert>
    }
  }
}}


  const image =()=>{
    if(typeof(selectedFile)=="object"){
      return "hidden"
    }else if(typeof(doctorMemberDetails.image_and_logo)=="undefined"){
      return "hidden"
    }
    }

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient" color={props.userDetails ? "amber":"blue"}>
        {props.userDetails ? "Edit Doctor" : "Add Doctor"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
       
        <DialogHeader>
          {props.userDetails ? "Update Doctor" : "Add Doctor"}
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              {/* <p>{doctorMemberDetails.id}</p> */}
              <Input
                label="First Name"
                type="text"
                color="lightBlue"
                size="regular"
                name="first_Name"
                value={doctorMemberDetails.first_Name}
                outline={true}
                onChange={onChange}
                required
              />
              <Input
                label="Last Name"
                type="text"
                color="lightBlue"
                size="regular"
                name="last_Name"
                onChange={onChange}
                value={doctorMemberDetails.last_Name}
                outline={true}
                required
              />
            </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="Email"
                onChange={onChange}
                type="text"
                color="lightBlue"
                value={doctorMemberDetails.email}
                size="regular"
                name="email"
                outline={true}
                required
              />
              <Input
                label="Contact Number"
                onChange={onChange}
                type="number"
                min="0"
                color="lightBlue"
                size="regular"
                name="contact"
                value={doctorMemberDetails.contact}
                outline={true}
                required
              />
            </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="Designation"
                onChange={onChange}
                type="text"
                color="lightBlue"
                value={doctorMemberDetails.designation}
                size="regular"
                name="designation"
                outline={true}
                required
              />
              <Input
                label="Experience"
                onChange={onChange}
                type="number"
                min="0"
                color="lightBlue"
                size="regular"
                name="experience"
                value={doctorMemberDetails.experience}
                outline={true}
                required
              />
            </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="Qualification"
                onChange={onChange}
                type="text"
                color="lightBlue"
                value={doctorMemberDetails.qualification}
                size="regular"
                name="qualification"
                outline={true}
                required
              />
              <Input
                label="Specialist"
                onChange={onChange}
                type="text"
                color="lightBlue"
                size="regular"
                name="specialist"
                value={doctorMemberDetails.specialist}
                outline={true}
                required
              />
            </div>
            
            <div className="flex flex-row space-x-4">
              {props.userDetails ?<Input
                label="Password"
                type="password"
                onChange={onChange}
                color="lightBlue"
                name="password"
                value={doctorMemberDetails.password}
                size="regular"
                outline={true}
                disabled={true}
              />:<Input
              label="Password"
              type="password"
              onChange={onChange}
              color="lightBlue"
              name="password"
              value={doctorMemberDetails.password}
              size="regular"
              outline={true}
              required
            />}
          
              <Input
                label="Address"
                type="text"
                onChange={onChange}
                color="lightBlue"
                name="Address"
                value={doctorMemberDetails.Address}
                size="regular"
                outline={true}
                required
              />
            </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="DOB"
                type="date"
                inputFormat="MM/dd/yyyy"
                pattern="\d{2}-\d{2}-\d{4}"
                onChange={onChange}
                color="lightBlue"
                name="DOB"
                value={doctorMemberDetails.DOB}
                size="regular"
                outline={true}
                required
              />
              <select className="w-full px-2 py-[7.5px] rounded-md border-solid border-2 border-lightBlue-1000" label="Gender" name="gender" value={doctorMemberDetails.gender} onChange={onChange} id="mySelect">
            <option disabled selected>Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
            </div>
            {/* <div className="">
            <Input
                label="Image"
                type="file"
                onChange={handleFileChange}
                color="lightBlue"
                name="image_and_logo"
                // value={doctorMemberDetails.image_and_logo}
                size="regular"
                outline={true}
              />
            </div> */}
             <div className="flex flex-row space-x-4">
                <Input
                label="Image"
                type="file"
                onChange={handleFileChange}
                color="lightBlue"
                name="image_and_logo"
                size="regular"
                outline={true}
                accept="image/*" 
              />
              <div className="w-full flex justify-center">
               {preview && <img className="h-10 w-24 rounded-full" src={preview} alt="Preview" />}
               <img className={`h-10 w-24 rounded-full ${image()}`} src={ "https://sagar.pythonanywhere.com/media/"+ doctorMemberDetails.image_and_logo} />
               </div>
           </div>
          </div>
        </DialogBody>
        <DialogFooter>
        {handle_password_alert()}
          {handlealert()}
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button disabled={handleDisable_btn()} variant="gradient" color="green" onClick={props.userDetails ? Updatedoctormember : AdddoctorMember}>
            <span>
              {props.userDetails ? "Update Doctor" : "Add Doctor"}
            </span>
          </Button>
        </DialogFooter>
        <div>{show? <div><Loader/></div>:null}</div>
      </Dialog>
    </Fragment>
  );
};

export default AddDoctor;
