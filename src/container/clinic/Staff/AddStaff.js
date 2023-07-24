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
  Input,
  Alert, 
  File,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewStaffAction, UpdateStaffAction,GetStaffListAction } from "../../../redux/Clinic/clinicActions";
import { useNavigate } from "react-router-dom";
import { Toys } from "@mui/icons-material";
import { Spinner } from "@material-tailwind/react";


const AddStaff = props => {
  const [open, setOpen] = useState(false);
  const [staffMemberDetails, setStaffMemberDetails] = React.useState(
    props.userDetails
  );
  const token = useSelector(state => state.login.accessToken);
  const [preview, setPreview] = useState('');
  const stfupdate = useSelector(state => state.clinic.stfupdate);
  const stfadd = useSelector(state => state.clinic.stfadd);

  const emailexist = useSelector(state => state.clinic.emailexist);

  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
 

  
  const [show, toogleShow] = useState(false);
  const Loader = () => {
    if(stfupdate == true || stfadd == true || emailexist == true){
      console.log("updated",stfupdate)
      toogleShow(false)
    }
    // if(stfupdate == undefined || stfadd == undefined){
    //   console.log("updated",stfupdate)
    //   toogleShow(false)
    // }
    else{
    return(
      <>
      <div className="w-full h-[379px] flex items-center justify-center bg-white opacity-75 rounded-lg -mt-[379px]">
        <Spinner className="h-16 w-16 text-blue-500/10 my-60" />
      </div>
      </>
    )
    };
    
if(stfupdate == true){
      console.log("updated",stfupdate)
    }
  }
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  const [selectedFile, setSelectedFile] = useState();
 
  const [emailval, setemailval] = useState(false);
  const [contactval, setcontactval] = useState(false); 
  const [passwordval, setpasswordval] = useState(false); 
  // const [passwordmsg, setpasswordmsg] = useState([]); 

  const navigate = useNavigate();

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

  const defoult_image=()=>{
    if (typeof(selectedFile)!="undefined"){
     return selectedFile
    }
  }

  const UpdateStaffmember = () => {
    const formData = new URLSearchParams();
    formData.append("first_Name", staffMemberDetails.first_Name);
    formData.append("last_Name", staffMemberDetails.last_Name);
    formData.append("email", staffMemberDetails.email);
    formData.append("contact", staffMemberDetails.contact);
    formData.append("image_and_logo",selectedFile);

    

    const stafData={
      "id":staffMemberDetails.id,
      "first_Name":staffMemberDetails.first_Name,
      "last_Name":staffMemberDetails.last_Name,
      "email":staffMemberDetails.email,
      // "password":staffMemberDetails.password,
      // "password2":staffMemberDetails.password,
      "contact":staffMemberDetails.contact,
      ...(selectedFile !== undefined && { "image_and_logo": selectedFile }),
    }
    // toogleShow(true)

    console.log(show)
    if (validateEmail(staffMemberDetails.email)==true){
      if(validatePhoneNumber(staffMemberDetails.contact)==true){
      // dispatch(GetStaffListAction(token));
      dispatch(UpdateStaffAction(stafData, token));
      toogleShow(true)
      // navigate('/clinic/staff/list')
      // handleOpen();
    }else{
      setcontactval(true)
      setemailval(false)
    }
  }else{
    setemailval(true)
  }

  };

if(stfupdate==true){
  console.log(stfupdate,"chkstfupdate")
  dispatch(GetStaffListAction(token));
  navigate('/clinic/staff/list')
}

  const AddStaffMember = () => {
    const formData = new URLSearchParams();
    formData.append("first_Name", staffMemberDetails.first_Name);
    formData.append("last_Name", staffMemberDetails.last_Name);
    formData.append("email", staffMemberDetails.email);
    formData.append("password", staffMemberDetails.password);
    formData.append("contact", staffMemberDetails.contact);
    formData.append("password2", staffMemberDetails.password);
    formData.append("image_and_logo",selectedFile);

    const staffData={
      "first_Name":staffMemberDetails.first_Name,
      "last_Name":staffMemberDetails.last_Name,
      "email":staffMemberDetails.email,
      "password":staffMemberDetails.password,
      "password2":staffMemberDetails.password,
      "contact":staffMemberDetails.contact,
      ...(selectedFile !== undefined && { "image_and_logo": selectedFile }),
    }
    toogleShow(true)

    console.log(show)
    if (validateEmail(staffMemberDetails.email)==true){
      if(validatePhoneNumber(staffMemberDetails.contact)==true){
      dispatch(AddNewStaffAction(staffData, token));
      // dispatch(GetStaffListAction(token));
      handleOpen();
      // navigate('/clinic/staff/list')
  }else{
    setcontactval(true)
    setemailval(false)
  }
    }else{
      setemailval(true)
    }
    
  };

if (stfadd==true){ 
  console.log(stfadd,"chkadd")
  dispatch(GetStaffListAction(token));
  navigate('/clinic/staff/list')
}

if(emailexist==true){
  console.log(emailexist,"chkemail")
  dispatch(GetStaffListAction(token));
  navigate('/clinic/staff/list')
}

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const [isShown, setIsShown] = useState(false);
  const onChange = e => {
    setStaffMemberDetails({
      ...staffMemberDetails,
      [e.target.name]: e.target.value
    });
  };
  const img = () =>{
    // var img = document.getElementById("img").value.length
    // alert(img)
    if ( img==0){
      setIsShown(false)
    }
    else{
      setIsShown(true)
    }
  }

  


let a=false
// const handleDisable_btn= ()=> {
if(typeof(staffMemberDetails.first_Name)==='undefined'){
    a=true
  } else if(typeof(staffMemberDetails.last_Name)==='undefined'){
    a=true
  }else if(typeof(staffMemberDetails.email)==='undefined'){
    a=true
  }else if(typeof(staffMemberDetails.contact)==='undefined'){
    a=true
  }else if(typeof(staffMemberDetails.password)==='undefined'){
    a=true
  }else if(validatePassword(staffMemberDetails.password)==false){
    a=true
  }else if(staffMemberDetails.first_Name==""){
    a=true
  }else if(staffMemberDetails.last_Name==""){
    a=true
  }else if(staffMemberDetails.email==""){
    a=true
  }else if(staffMemberDetails.contact==""){
    a=true
  }
  else if(staffMemberDetails.password==""){
    a=true
  }

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
  if (typeof(staffMemberDetails.password)!="undefined"){
    if(validatePassword(staffMemberDetails.password)==false){
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
}


const image =()=>{
if(typeof(selectedFile)=="object"){
  return "hidden"
}else if(typeof(staffMemberDetails.image_and_logo)=="undefined"){
  return "hidden"
}
}



console.log((image()),"chkfile")
console.log(staffMemberDetails.image_and_logo,"chkfile2")
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient" color={props.userDetails? "amber":"blue"}>
        {props.userDetails ? "Edit Staff" : "Add Staff"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div>
          {props.userDetails ? "Update Staff Member" : "Add Staff Member"}
          </div>
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <Input
                label="First Name"
                type="text"
                color="lightBlue"
                size="regular"
                name="first_Name"
                value={staffMemberDetails.first_Name}
                // value={props.userDetails ? staffMemberDetails.first_Name : null}
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
                // value={props.userDetails ? staffMemberDetails.last_Name : null}
                value={staffMemberDetails.last_Name}
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
                // value={props.userDetails ? staffMemberDetails.email : null}
                value={staffMemberDetails.email}
                size="regular"
                name="email"
                outline={true}
                required
              />
            {/* </div>
            <div className=""> */}
              <Input
                label="Contact"
                onChange={onChange}
                type="number"
                color="lightBlue"
                size="regular"
                name="contact"
                // value={props.userDetails ? staffMemberDetails.contact : null}
                value={staffMemberDetails.contact}
                outline={true}
                required
              />
            </div>
            <div >
              {!props.userDetails ?<Input
                label="Password"
                type="password"
                onChange={onChange}
                color="lightBlue"
                name="password"
                // value={props.userDetails ? staffMemberDetails.password : null}
                value={staffMemberDetails.password}
                size="regular"
                outline={true}
                required
              />:<Input
              label="Password"
              type="password"
              onChange={onChange}
              color="lightBlue"
              name="password"
              // value={props.userDetails ? staffMemberDetails.password : null}
              value={staffMemberDetails.password}
              size="regular"
              outline={true}
              disabled={true}
              // hidden={true}
              // style={{ display: 'none' }}
            />}
              
               </div>
               <div className="flex flex-row space-x-4">
                <Input
                label="Image"
                type="file"
                onChange={handleFileChange}
                color="lightBlue"
                name="image_and_logo"
                // value={staffMemberDetails.image_and_logo}
                // src={ "https://sagar.pythonanywhere.com/media/"+ staffMemberDetails.image_and_logo}
                size="regular"
                outline={true}
                accept="image/*" 
              />
              <div className="w-full flex justify-center">
               {preview && <img className="h-10 w-24 rounded-full" src={preview} alt="Preview" />}
               <img className={`h-10 w-24 rounded-full ${image()}`} src={ "https://sagar.pythonanywhere.com/media/"+ staffMemberDetails.image_and_logo} />
               </div>
           </div>
          </div>
        </DialogBody>
        <DialogFooter >
          {handle_password_alert()}
          {handlealert()}
          <div>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button disabled={handleDisable_btn()} variant="gradient" color="green" onClick={props.userDetails ? UpdateStaffmember : AddStaffMember}>
            <span>
              {props.userDetails ? "Update staff" : "Add staff"}
            </span>
          </Button>
          </div>
        </DialogFooter>
        <div>{show? <div><Loader/></div>:null}</div>
      </Dialog>
    </Fragment>
  );
};

export default AddStaff;
