import React,{useState, useRef} from 'react'
import DoctorLayout from '../../../components/Layout/Doctors/DoctorLayout';
import { GetDoctorProfileAction,UpdatedoctorSelfProfileAction, GetDoctorSelfProfileAction } from '../../../redux/Doctor/doctorAction';
import uplode from './upload.png'
import { Spinner } from "@material-tailwind/react";



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
import { useNavigate } from 'react-router-dom';


const DoctorProfile = () => {
    const accessToken = useSelector(state => state.login.accessToken);
    const userDetail = useSelector(state => state.login.userDetail)
    const doctorPersonal = useSelector(state => state.doctor.doctorPersonal)
    const upprofile = useSelector(state => state.doctor.upprofile)
    const derror = useSelector(state => state.doctor.derror)
    console.log("upprofile======",upprofile)
    const [selectedFile, setSeletedFile]=useState(null)
    console.log(doctorPersonal,"newcheck")
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const handleImageClick=()=>{
      inputRef.current.click();
    }

const navigate = useNavigate();    

// const d={
//   "email" : doctorPersonal ? doctorPersonal.email : ""
// }

// console.log(d,"chkwok")

const docdata= {
  "id": doctorPersonal ? doctorPersonal.id : "",
  "email": doctorPersonal ? doctorPersonal.email : "" ,
  "first_Name": doctorPersonal ? doctorPersonal.first_Name : "",
  "last_Name": doctorPersonal ? doctorPersonal.last_Name : "",
  "Address": doctorPersonal ? doctorPersonal.Address : "",
  "contact": doctorPersonal ? doctorPersonal.contact : "",
  "specialist": doctorPersonal ? doctorPersonal.specialist : "",
  "qualification": doctorPersonal ? doctorPersonal.qualification : "",
  "experience": doctorPersonal ? doctorPersonal.experience : "",
  "designation": doctorPersonal ? doctorPersonal.designation : "",
  "clinic_id": doctorPersonal ? doctorPersonal.clinic_id : "",
  "type": doctorPersonal ? doctorPersonal.type : "",
  "image_and_logo": doctorPersonal ? doctorPersonal.image_and_logo : ""
}


const [userDetails, setUserDetails] = React.useState(
 docdata
);

// if(typeof(doctorPersonal)!="undefined"){
//   console.log(doctorPersonal.email,"chkuserD")
// }

//  React.useEffect(() => {
//     dispatch(GetDoctorSelfProfileAction(accessToken))
//   }, [])

const [show, toogleShow] = useState(false);
  const Loader = () => {
  if(upprofile == true || derror == true){
    console.log("updated_doctor",upprofile)
    toogleShow(false)
  }
  else{
  return(
    <>
      <div className="w-full h-[550px] flex items-center justify-center bg-[hsl(0,90%,99%)] opacity-75 rounded-lg -mt-[550px]">
        <Spinner className="h-16 w-16 text-blue-500/10 my-60" />
      </div>    
    </>
  )
}
}

// const handleOpen = () => setOpen(!open);

const Updatedoctorself = () => {
  const formData = new URLSearchParams();

  const y = {
    "first_Name": userDetails.first_Name,
    "last_Name": userDetails.last_Name,
    "email": userDetails.email,
    "contact": userDetails.contact,
    "designation": userDetails.designation,
    "experience": userDetails.experience,
    "qualification": userDetails.qualification,
    "specialist": userDetails.specialist,
    "image_and_logo":selectedFile
  }
  console.log(selectedFile,"chkfile")
  toogleShow(true)
  dispatch(UpdatedoctorSelfProfileAction(y, accessToken));
  // handleOpen();
};

const handleFileChange = (event)=>{
  setSeletedFile(event.target.files[0]);
}

const onChange = e => {
  setUserDetails({
    ...userDetails,
    [e.target.name]: e.target.value
  });
};

    return <>
    <DoctorLayout>
        {/* {accessToken} */}
        <Card className="h-full w-full shadow-xl">
        <CardHeader floated={false} shadow={false} className="bg-[hsl(0,90%,99%)] grid mt-20 mr-44 ml-44">
            <div className="mb-4 mt-4 flex items-center justify-between gap-8 ml-2">
              <div className='relative mx-auto' onClick={handleImageClick} onChange={handleFileChange}>
                {/* <Typography variant="h3" color=""> */}
                {selectedFile ? <Avatar src={URL.createObjectURL(selectedFile)} alt="avatar" size="xxl" className=' mr-8 h-[180px] w-[180px]' /> : <Avatar src={ "https://sagar.pythonanywhere.com/media/"+ userDetails.image_and_logo} alt="avatar" size="xxl" className=' mr-8  h-[180px] w-[180px]' /> }
                <input type='file' ref={inputRef} style={{display:"none"}}/>
                <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-gray bg-gray-200 font-semibold font-serif text-center text-2xl rounded-full h-[180px] w-[180px]"><img src={uplode} alt="Uplode" /></div>
                {/* <Button  onClick={handleImageClick} className='text-white bg-[#F4A06E]'>Change profile picture</Button> */}
                {/* </Typography> */}
              </div>
            </div>
          </CardHeader>
          <CardBody className='bg-[hsl(0,90%,99%)] rounded-2xl grid shadow-xl ml-44 mr-44'>
          <div className="flex flex-col space-y-6">
            <div className='flex flex-row space-x-6'>
          <Input
                 placeholder="First Name"
                 type="text"
                 color="green"
                 size="regular"
                 name="first_Name"
                 value={userDetails.first_Name}
                // value={"work"}
                 outline={true}
                 onChange={onChange}
                 label='First Name'
                 
               />
            <Input
                placeholder="Last Name"
                type="text"
                color="green"
                size="regular"
                name="last_Name"
                onChange={onChange}
                value={userDetails.last_Name}
                outline={true}
                label='Last Name'
                // disabled={true}
                // onChange={onChange}
              />
              </div>
            {/* <div className="flex flex-row space-x-6">
              <Input
                placeholder="Gender"
                onChange={onChange}
                type="date"
                color="green"
                value="20-04-2000"
                size="regular"
                name=""
                outline={true}
                label='Date of Birth'
                // disabled={true}
              />
            
              <Input
                placeholder="Address"
                onChange={onChange}
                type="text"
                color="green"
                size="regular"
                name=""
                value="Regal Square"
                outline={true}
                label='Address'
                // disabled={true}
              />
            </div> */}
            <div className="flex flex-row space-x-6">
              <Input
                placeholder="Designation"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetails.designation}
                size="regular"
                name="designation"
                outline={true}
                label='Designation'
                // disabled={true}
              />
            
              <Input
                placeholder="Experience"
                onChange={onChange}
                type="number"
                min="0"
                color="green"
                size="regular"
                name="experience"
                value={userDetails.experience}
                outline={true}
                label='Experience'
                // disabled={true}
              />
            </div>
            <div className="flex flex-row space-x-6">
              <Input
                placeholder="Qualification"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetails.qualification}
                size="regular"
                name="qualification"
                outline={true}
                label='Qualification'
                // disabled={true}
              />
            
              <Input
                placeholder="Specialist"
                onChange={onChange}
                type="text"
                color="green"
                size="regular"
                name="specialist"
                value={userDetails.specialist}
                outline={true}
                label='Specialist'
                // disabled={true}
              />
            </div>
            <div className="flex flex-row space-x-6">
              <Input
                placeholder="Email"
                onChange={onChange}
                type="text"
                color="green"
                value={userDetail.email}
                size="regular"
                name="email"
                outline={true}
                disabled={true}
                label='Email'
                // onChange={onChange}
              />
              <Input
                 placeholder="Contact Number"
                 onChange={onChange}
                 type="text"
                //  min="0"
                 color="green"
                 size="regular"
                 name="contact"
                 value={userDetail.contact}
                 outline={true}
                disabled={true}
                label='Contact Number'
              />
            </div>
            {/* <Input
                placeholder="image"
                onChange={handleFileChange}
                type="file"
                color="green"
                // value={userDetails.image_and_logo}
                size="regular"
                name="image_and_logo"
                outline={true}
                label='image'
                // disabled={true}
              /> */}
          </div>
          <CardFooter className='grid place-items-center'>
          <Button variant="gradient" color="green" onClick={Updatedoctorself}>
            <span>
              {"Save Changes"}
            </span>
          </Button>
          </CardFooter>
          <div>{show? <div><Loader/></div>:null}</div>
          </CardBody>
          
          </Card>
          
    </DoctorLayout>
    </>;
}


export default DoctorProfile;
