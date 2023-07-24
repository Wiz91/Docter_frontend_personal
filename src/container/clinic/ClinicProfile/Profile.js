import React from 'react'
import ClinicLayout from '../../../components/Layout/Clinic/ClinicLayout';
import { GetClinicProfileAction ,UpdateClinicProfileAction, UpdateStaffProfileAction} from '../../../redux/Clinic/clinicActions';
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
import { useState,useRef } from 'react';
// import logo from './cliniclogo.jpeg';
// import time from './opens.png';
import upload from './upload.png';

const Profile = () => {
    const accessToken = useSelector(state => state.login.accessToken);
    const logintype = useSelector(state=>state.login.type);
    // const clinicprofile = useSelector(state => state.clinic.clinicprofile)
    const userDetail = useSelector(state => state.login.userDetail)
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null)
    


    const handleImageClick =()=>{
      inputRef.current.click();
    }

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };


    const [clinicProfileDetails, setclinicProfileDetails] = React.useState(
      userDetail
    );

    const [staffProfileDetails, setstaffProfileDetails] = React.useState(
      userDetail
    );
   
  
    const dispatch = useDispatch();
    
  
    const UpdateClinic = () => {
      const formData = new URLSearchParams();
      formData.append("email", userDetail.email);
      formData.append("contact", userDetail.contact);
      formData.append("clinic_Name", clinicProfileDetails.clinic_Name);
      formData.append("Owner_First_Name", clinicProfileDetails.Owner_First_Name);
      formData.append("Owner_Last_Name", clinicProfileDetails.Owner_Last_Name);
      formData.append("Address", clinicProfileDetails.Address);
      formData.append("map", clinicProfileDetails.map);
      formData.append("image_and_logo", selectedFile);
      
     

      const z ={
        "email": userDetail.email,
        "contact": userDetail.contact,
        "clinic_Name": clinicProfileDetails.clinic_Name,
        "Owner_First_Name": clinicProfileDetails.Owner_First_Name,
        "Owner_Last_Name": clinicProfileDetails.Owner_Last_Name,
        "Address": clinicProfileDetails.Address,
        "map":clinicProfileDetails.map,
        "image_and_logo":selectedFile
      }
      
      dispatch(UpdateClinicProfileAction(z, accessToken));
    };
    

    // console.log(userDetail.map,"clinicmap")

  
    const onChange = e => {
      setclinicProfileDetails({
        ...clinicProfileDetails,
        [e.target.name]: e.target.value
      });
      setstaffProfileDetails({
        ...staffProfileDetails,
        [e.target.name]: e.target.value
      });
    };


    const UpdateStaff = () => {
      const formData = new URLSearchParams();
      formData.append("email", userDetail.email);
      formData.append("contact", userDetail.contact);
      formData.append("clinic_Name", userDetail.clinic_Name);
      formData.append("first_Name", staffProfileDetails.first_Name);
      formData.append("last_Name", staffProfileDetails.last_Name);
      formData.append("image_and_logo", selectedFile);
   
      const p ={
        "email": userDetail.email,
        "contact": userDetail.contact,
        "clinic_Name": staffProfileDetails.clinic_Name,
        "first_Name": staffProfileDetails.first_Name,
        "last_Name": staffProfileDetails.last_Name,
        "image_and_logo":selectedFile
      }
      
      dispatch(UpdateStaffProfileAction(p, accessToken));
     
    };

    

    if (logintype=='CLINIC'){
    return <>
    <ClinicLayout>
      <div className='mx-auto my-auto bg-transparent border-none'>
        <Card className="h-full w-full rounded-none mx-auto grid grid-cols-2 gap-3">
          <CardBody className='h-fit shadow-xl'>
          <div className="mb-8 flex flex-row items-center justify-between gap-8">
              <div className='mx-auto cursor-pointer relative' onClick={handleImageClick} onChange={handleFileChange}>
                {selectedFile ? <Avatar src={URL.createObjectURL(selectedFile)} alt="Clinic Logo" variant="rounded" color="green" className="p-0.5 h-[205px] w-[205px]"/> : <Avatar src={"https://sagar.pythonanywhere.com"+userDetail.image_and_logo} alt="Clinic Logo" variant="rounded" color="green" className="p-0.5 h-[205px] w-[205px]"/> }
               <input type='file' ref={inputRef} style={{display:"none"}}/>
               {/* <div class="opacity-0 group-hover:opacity-100 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end text-xl bg-gray-200 text-black font-semibold font-serif">Change Logo</div> */}
               <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center" title="Change Logo"><img src={upload} alt="Change Logo" className='h-[205px] w-[205px]'/></div>
              </div> 
            </div>
                     
          <div className="flex flex-col space-y-6">
            <div className='flex flex-row space-x-4'>
          <Input
               label="Clinic Name"
               type="text"
              //  color="lightBlue"
                color="green"
               size="regular"
               name="clinic_Name"
               value={clinicProfileDetails.clinic_Name}
               outline={true}
               onChange={onChange}
              />
              <Input
                label="Clinic Address"
                type="text"
                color="green"
                size="regular"
                name="Address"
                onChange={onChange}
                value={clinicProfileDetails.Address}
                outline={true}
              />
              </div>
            <div className="flex flex-row space-x-4">
              <Input
               label="Owner First Name"
               onChange={onChange}
               type="text"
               color="green"
               value={clinicProfileDetails.Owner_First_Name}
               size="regular"
               name="Owner_First_Name"
               outline={true}
              />
              <Input
                label="Owner Last Name"
                onChange={onChange}
                type="text"
                color="green"
                size="regular"
                name="Owner_Last_Name"
                value={clinicProfileDetails.Owner_Last_Name}
                outline={true}
              />
            </div>
            <div>
            <Input
                label="Location"
                onChange={onChange}
                type="text"
                color="green"
                size="regular"
                name="map"
                value={clinicProfileDetails.map}
                outline={true}
              />
            </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="Email"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetail.email}
                size="regular"
                name="email"
                outline={true}
                disabled={true}
              />
            
              <Input
                label="Contact"
                onChange={onChange}
                type="number"
                min="0"
                color="green"
                size="regular"
                name="contact"
                value={userDetail.contact}
                outline={true}
                disabled={true}
              />
            </div>
            <div className='mt-3 mx-auto'>
              <Button variant="gradient" color="green" onClick={UpdateClinic}>
            <span>
              {"Save Changes"}
            </span>
          </Button>
              </div>    
          </div>
          </CardBody>
              <CardBody className='shadow-xl bg-[white]'>
              <iframe className='w-full h-[470px]' title="clinic map" src={"https://maps.google.com/maps?q=" + userDetail.map +"&hl=es;&output=embed"}
></iframe>

            </CardBody>
          </Card>
          </div>
    </ClinicLayout>
    </>;
    }
    return <>
    <ClinicLayout>
      <div className='mx-auto my-auto bg-transparent border-none'>
        <Card className="h-full w-full rounded-none mx-auto grid grid-cols-2 gap-3">
          <CardBody className='h-fit shadow-xl'>
          <div className="mb-8 flex flex-row items-center justify-between gap-8">
              <div className='mx-auto cursor-pointer relative' onClick={handleImageClick} onChange={handleFileChange}>
                {selectedFile ? <Avatar src={URL.createObjectURL(selectedFile)} alt="Clinic Logo" variant="rounded" color="green" className="p-0.5 h-[205px] w-[205px]"/> : <Avatar src={"https://sagar.pythonanywhere.com"+userDetail.image_and_logo} alt="Clinic Logo" variant="rounded" color="green" className="p-0.5 h-[205px] w-[205px]"/> }
               <input type='file' ref={inputRef} style={{display:"none"}}/>
               <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center" title="Change Logo"><img src={upload} alt="Change Logo" className='h-[205px] w-[205px]'/></div>
              </div> 
            </div>
                     
          <div className="flex flex-col space-y-6">
            <div className='flex flex-row space-x-4'>
          <Input
               label="First Name"
               type="text"
              //  color="lightBlue"
                color="green"
               size="regular"
               name="first_Name"
               value={staffProfileDetails.first_Name}
               outline={true}
               onChange={onChange}
              />
              <Input
                label="Last Name"
                type="text"
                color="green"
                size="regular"
                name="last_Name"
                onChange={onChange}
                value={staffProfileDetails.last_Name}
                outline={true}
              />
              </div>
            <div className="flex flex-row space-x-4">
              <Input
                label="Email"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetail.email}
                size="regular"
                name="email"
                outline={true}
                disabled={true}
              />
            
              <Input
                label="Contact"
                onChange={onChange}
                type="number"
                min="0"
                color="green"
                size="regular"
                name="contact"
                value={userDetail.contact}
                outline={true}
                disabled={true}
              />
            </div>
            <div>
            <Input
                label="Clinic Name"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetail.clinic_Name}
                size="regular"
                name="clinic_Name"
                outline={true}
                disabled={true}
              />
            </div>
            <div className='mt-3 mx-auto'>
              <Button variant="gradient" color="green" onClick={UpdateStaff}>
            <span>
              {"Save Changes"}
            </span>
          </Button>
              </div>    
          </div>
          </CardBody>
              <CardBody className='shadow-xl bg-[white]'>
              <iframe className='w-full h-[470px]' title="clinic map" src={"https://maps.google.com/maps?q=" + userDetail.map +"&hl=es;&output=embed"}
></iframe>
 
            </CardBody>
          </Card>
          </div>
    </ClinicLayout>
    </>;
    }  


export default Profile;