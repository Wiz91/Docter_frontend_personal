import React, { useRef,useEffect } from "react";
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
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Stepper, 
  Step,
  Label,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewDoctorAvailabilityAction, UpdateDoctorAvailabilityAction } from "../../../redux/Clinic/clinicActions";
import AddDoctorAvailabilities from "./AddDoctorAvailability";
import { GetDoctorListAction } from '../../../redux/Doctor/doctorAction';
import { GetPatientListAction,AddNewAppointmentAction } from '../../../redux/Clinic/clinicActions';
import { GetAppointmentListAction } from '../../../redux/Clinic/clinicActions';
import axios from 'axios';
import { HearingDisabled } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';



const DoctorsNameList = props => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [activeTab, setActiveTab] = React.useState("html");
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [color, setColor] = useState('blue');
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [appointmentDetails, setappointmentDetails] = React.useState(
    props.userDetails
  );
  const [selecteddate, setselecteddate] = useState();
  const [appointmentdate_time, setappointmentdate_time] = React.useState(
    props.userDetails
  );
 
  const addappoint = useSelector(state => state.clinic.addappoint);
  const appointmentList = useSelector(state => state.clinic.appointmentList)
  const alreayhasapp = useSelector(state => state.clinic.alreayhasapp);
  const token = useSelector(state => state.login.accessToken);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const [activeButton, setActiveButton] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function compareTime(time1, time2) {
    const timeFormat = 'h:mm A'; // AM/PM format
    const time1Converted = new Date('1970/01/01 ' + time1).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const time2Converted = new Date('1970/01/01 ' + time2).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
    if (time1Converted < time2Converted) {
      return `smaller than`;
    } else if (time1Converted > time2Converted) {
      return `greater than`;
    } else {
      return `is equal`;
    }
  }
  


  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: Months are zero-based
  const day = currentDate.getDate();
  const currentTime = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
  function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dayOfWeekIndex = date.getDay();
  
    return daysOfWeek[dayOfWeekIndex];
  }


  function convertAMPMto24Hour(time) {
    const timeRegex = /^(\d{1,2}):(\d{2})\s([AP]M)$/i;
    const matches = time.match(timeRegex);
  
    if (!matches) {
      // Invalid time format
      return null;
    }
  
    let hours = parseInt(matches[1], 10);
    const minutes = parseInt(matches[2], 10);
    const isPM = (matches[3].toUpperCase() === 'PM');
  
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    return formattedTime;
  }

  const handleInputChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  const inputValue = formValues['date_value'];
  
  
  let start_date=""
  let start_day=""
  let full_date=""
  if (typeof inputValue=="undefined"){
     start_date=getdate(formattedDate)
     start_day=getDayOfWeek(formattedDate)
     full_date=formattedDate
  }else{
     start_date=getdate(inputValue)
     start_day=getDayOfWeek(inputValue)
     full_date=inputValue
  }

  function getdate(date) {
    const inputDate = date;
  
    const dateParts = inputDate.split('-');
    
    const reformattedDate = `${dateParts[2]}`;
    return reformattedDate 
    }


  const accessToken = useSelector(state => state.login.accessToken)
  const doctorList = useSelector(state => state.doctor.DoctorList)
  const PatientList = useSelector(state => state.clinic.PatientList)

  const handleOpen = () => setOpen(!open);  
  
  
  function getUpcomingDates(startDate) {
    const dates = [];
    const parts = startDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
  
    const currentDate = new Date(year, month, day);
  
    for (let i = 0; i < 7; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      const formattedDate = currentDate.toISOString().slice(0, 10);
      dates.push(formattedDate);
    }
  
    return dates;
  }
  
  // Example usage:
  const startDateString = full_date;
  
  const upcomingDates = getUpcomingDates(startDateString);

  function chanagedateformate(date) {
    const inputDate = date;
  
    const dateParts = inputDate.split('-');
    
    const reformattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(reformattedDate);
    return reformattedDate 
    }
 


  const Addappointment = () => {
    const formData = new URLSearchParams();
    

    const data ={
      "doctor_id": appointmentDetails.doctor_id,
      "patient_id": appointmentDetails.patient_id,
      "slots":appointmentdate_time.time,
      "date_of_appointment":chanagedateformate(appointmentdate_time.date),  
    }
     
    dispatch(AddNewAppointmentAction(data, token));
    handleOpen();
  };

  if(addappoint==true || alreayhasapp==true){
  dispatch(GetAppointmentListAction(accessToken))
  navigate('/clinic/appointment/list')
  }

  const [alldoc, setalldoc] = useState(null);
  const [allpatient, setallpatient] = useState(null);
  const [allappointments,setallappointments] =  useState(null);
  const [all_non_appointments,setall_non_appointments] =  useState(null);
  const [testapi,settestapi] =  useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doc API
        const response1 = await axios.get('https://sagar.pythonanywhere.com/account/view-all/doctor',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        setalldoc(response1.data.data.results);

        // Fetch patient API
        const response2 = await axios.get('https://sagar.pythonanywhere.com/appointment/view-all/patient',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
          });
        setallpatient(response2.data.data.results);

        // Fetch allapp api
        const response3 = await axios.get('https://sagar.pythonanywhere.com/appointment/view-all/appointments',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        setallappointments(response3.data.data.results);
        
        // Fetch non_avi api
        const response4 = await axios.get('https://sagar.pythonanywhere.com/appointment/view-all/doctor/non-availability',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        setall_non_appointments(response4.data.data.results);

        const response5 = await axios.get('https://sagar.pythonanywhere.com/appointment/test/patient/list',{
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
        settestapi(response5.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);


console.log(allappointments,"chktest")

// if(typeof(appointmentDetails)!="undefined"){
// if(allappointments !=null){
//  allappointments.forEach(function(i) {
//   if (parseInt(appointmentDetails.doctor_id)===i.doctor[0]){
//   console.log(parseInt(appointmentDetails.doctor_id),"in")
//   console.log(i["slot"],"foreach"); 
//   }
// });
// };
//   };


const slots=['10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM'];


const handleDisable = (date,time) =>  {
  let a=false
  if (date == formattedDate){
    let chkbtn= compareTime(currentTime,time)
    if (chkbtn==="greater than"){
     return true;
    }else if(typeof(appointmentDetails)!="undefined"){
      if(allappointments !=null){
        allappointments.forEach(function(i) {
         if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
         if (date===i['slot']["date"]){
          if (i['slot']["slote_no"]===convertAMPMto24Hour(time)){
            a=true
          }
         } else if (typeof(appointmentDetails)!="undefined"){
          if (all_non_appointments != null){
          all_non_appointments.forEach(function(i) {
                     if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
                     if (date===i["doctor_non_availability_date"]){
                       i["slots"].forEach(function(j){
                         if (convertAMPMto24Hour(j)==convertAMPMto24Hour(time)){
                            a = true
                         }
                       });
                       if (a==true){
                        return true
                       }
                     }
                     }
                   });
                  }
         }
         }
       });
       if (a==true){
        return true
       }
       };
     } else if (typeof(appointmentDetails)!="undefined"){
      if (all_non_appointments != null){
      all_non_appointments.forEach(function(i) {
                 if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
                 if (date===i["doctor_non_availability_date"]){
                   i["slots"].forEach(function(j){
                     if (convertAMPMto24Hour(j)==convertAMPMto24Hour(time)){
                        a = true
                     }
                   });
                   if (a==true){
                    return true
                   }
                 }
                 }
               });
              }
     }
  }else if(typeof(appointmentDetails)!="undefined"){
    if(allappointments !=null){
      allappointments.forEach(function(i) {
       if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
        console.log("Workingg")
       if (date===i['slot']["date"]){
        if (i['slot']["slote_no"]===convertAMPMto24Hour(time)){
          a=true
        }
       }else if (typeof(appointmentDetails)!="undefined"){
        if (all_non_appointments != null){
        all_non_appointments.forEach(function(i) {
                   if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
                   if (date===i["doctor_non_availability_date"]){
                     i["slots"].forEach(function(j){
                       if (convertAMPMto24Hour(j)==convertAMPMto24Hour(time)){
                          a = true
                       }
                     });
                     if (a==true){
                      return true
                     }
                   }
                   }
                 });
                }
       }
       }else if (typeof(appointmentDetails)!="undefined"){
        if (all_non_appointments != null){
        all_non_appointments.forEach(function(i) {
                   if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
                   if (date===i["doctor_non_availability_date"]){
                     i["slots"].forEach(function(j){
                       if (convertAMPMto24Hour(j)==convertAMPMto24Hour(time)){
                          a = true
                       }
                     });
                     if (a==true){
                      return true
                     }
                   }
                   }
                 });
                }
       }
     });
     if (a==true){
      return true
     }
     };
   } else if (typeof(appointmentDetails)!="undefined"){
    if (all_non_appointments != null){
    all_non_appointments.forEach(function(i) {
               if (parseInt(appointmentDetails.doctor_id)===parseInt(i.doctor[0])){
               if (date===i["doctor_non_availability_date"]){
                 i["slots"].forEach(function(j){
                   if (convertAMPMto24Hour(j)==convertAMPMto24Hour(time)){
                      a = true
                   }
                 });
                 if (a==true){
                  return true
                 }
               }
               }
             });
            }
   }
};



let x=true

if (typeof(appointmentDetails)!="undefined"){
    if (typeof(appointmentDetails.patient_id && appointmentDetails.doctor_id) != "undefined"){
    x=false
    }
}



const handleButtonClick = (event) => {
  const buttonId = event.target.id;
  setActiveButton(buttonId === activeButton ? '' : buttonId);
};


const handleActivetab = () => {
   if(typeof(inputValue) === "undefined"){
     return full_date
   }
   else{
    return inputValue
   }
};


const forword_stapper =()=>{
  if(typeof(appointmentDetails)!="undefined"){
    if (typeof(appointmentDetails.patient_id) != "undefined"){
      setActiveStep(1)
    }
  }
}

const get_selected_slots=(date,time,id)=>{
  setActiveButton(id === activeButton ? '' : id);
  setappointmentdate_time({"date": date,"time":time});
};
 

  const data = [
    { 
      index:0,
      label: start_date +" "+start_day,
      value: upcomingDates[0],
      desc: <div className="text-center">
         {slots.map((buttonLabel, index) => (
        <Button id={`${upcomingDates[0]}${index}`} onClick={()=>get_selected_slots(upcomingDates[0],buttonLabel,`${upcomingDates[0]}${index}`)} disabled={handleDisable(upcomingDates[0],buttonLabel)}  className={activeButton === `${upcomingDates[0]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled " value={buttonLabel} key={index} >
          {buttonLabel}
        </Button>
      ))}
      </div>,
    },
    {
      index:1,
      label: getdate(upcomingDates[1])+" "+getDayOfWeek(upcomingDates[1]),
      value: upcomingDates[1],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[1]}${index}`}  disabled={handleDisable(upcomingDates[1],buttonLabel)} onClick={()=>get_selected_slots(upcomingDates[1],buttonLabel,`${upcomingDates[1]}${index}`)} className={activeButton === `${upcomingDates[1]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled" key={index} >
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },
 
    {
      index:2,
      label: getdate(upcomingDates[2])+" "+getDayOfWeek(upcomingDates[2]),
      value: upcomingDates[2],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[2]}${index}`}  onClick={()=>get_selected_slots(upcomingDates[2],buttonLabel,`${upcomingDates[2]}${index}`)} disabled={handleDisable(upcomingDates[2],buttonLabel)} className={activeButton === `${upcomingDates[2]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled" key={index} >
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },
 
    {
      index:3,
      label: getdate(upcomingDates[3])+" "+getDayOfWeek(upcomingDates[3]),
      value: upcomingDates[3],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[3]}${index}`}  onClick={()=>get_selected_slots(upcomingDates[3],buttonLabel,`${upcomingDates[3]}${index}`)} disabled={handleDisable(upcomingDates[3],buttonLabel)} className={activeButton === `${upcomingDates[3]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled" key={index}>
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },
 
    {
      index:4,
      label: getdate(upcomingDates[4])+" "+getDayOfWeek(upcomingDates[4]),
      value: upcomingDates[4],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[4]}${index}`}  onClick={()=>get_selected_slots(upcomingDates[4],buttonLabel,`${upcomingDates[4]}${index}`)} disabled={handleDisable(upcomingDates[4],buttonLabel)} className={activeButton === `${upcomingDates[4]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'}  variant="filled" key={index}>
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },

    {
      index:5,
      label: getdate(upcomingDates[5])+" "+getDayOfWeek(upcomingDates[5]),
      value: upcomingDates[5],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[5]}${index}`}  onClick={()=>get_selected_slots(upcomingDates[5],buttonLabel,`${upcomingDates[5]}${index}`)} disabled={handleDisable(upcomingDates[5],buttonLabel)} className={activeButton === `${upcomingDates[5]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled" key={index} >
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },

    {
      index:6,
      label: getdate(upcomingDates[6])+" "+getDayOfWeek(upcomingDates[6]),
      value: upcomingDates[6],
      desc: <div className="text-center">
      {slots.map((buttonLabel, index) => (
     <Button id={`${upcomingDates[6]}${index}`}  onClick={()=>get_selected_slots(upcomingDates[6],buttonLabel,`${upcomingDates[6]}${index}`)} disabled={handleDisable(upcomingDates[6],buttonLabel)} className={activeButton === `${upcomingDates[6]}${index}` ? 'bg-red-500 mx-1 my-1' : 'mx-1 my-1'} variant="filled" key={index} >
       {buttonLabel}
     </Button>
   ))}
   </div>,
    },
 
];

const onChange = e => {
  setappointmentDetails({
    ...appointmentDetails,
    [e.target.name]: e.target.value
  });
};

const empty_state=(i)=>{
  setselecteddate(i);
}

const visiabledate=()=>{
  if (typeof(selecteddate)=="undefined"){
   return chanagedateformate(formattedDate)
  }else{
   return chanagedateformate(selecteddate)
  }
} 



  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        {props.userDetails ? "" : "Book Appointment"}
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
      <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <Index.AddTaskIcon className="h-5 w-5" />
        </Step>
        <Step onClick={() => forword_stapper()}>
            <Index.CheckCircleIcon className="h-5 w-5"/>
        </Step>
      </Stepper>
    </div>
      <div className="text-center">
            <Typography
              variant="h6"
              color={"black"}
              className={activeStep === 0 ? "":"hidden"}
            >
              Choose Doctor & Patient 
            </Typography>
            <Typography
              variant="h6"
              color={"black"}
              className={activeStep === 1 ? "":"hidden"}
            >
              Appointment Date & Slots
            </Typography>
      </div>
       {/* first form */}
        <div className={activeStep === 1 ? "":"hidden"}>
        <div className="flex">
        <div className="px-8 py-8 hidden">
        {/* <MyComponent/> */}
        <Input
                placeholder="Date"
                type="date"
                label="Date"
                color="lightBlue"
                size="regular"
                name="date_value"
                outline={true}
                onChange={handleInputChange}
                defaultValue={formattedDate}
                min={formattedDate}
                max={upcomingDates[6]}
              />
        </div>
        <div>
      <Typography variant="h4" className="px-8 subpixel-antialiased ..." color="blue-gray">
          {visiabledate()}
      </Typography>
         </div>
        <div>
           
        </div>
     </div>

      <div>
      <Tabs id="custom-animation" value={handleActivetab()}>
  <TabsHeader>
    {data.map(({ label, value }) => (
      <Tab key={value} onClick={()=>empty_state(value)} value={value} >
        {label}
      </Tab>
    ))}
  </TabsHeader>
  <TabsBody
    animate={{
      initial: { y: 250 },
      mount: { y: 0 },
      unmount: { y: 250 },
    }}
  >
    {data.map(({ value, desc} ) => (
      <TabPanel key={value} value={value}>
        {desc}
      </TabPanel>
    ))}
  </TabsBody>
</Tabs>
      </div>
      </div>
       {/* Second form */}
      <div className={activeStep === 0 ? "my-28":"hidden"}>
      <div className="mt-20">
        <div>
      <Typography
                    variant="large"
                    color="blue-gray"
                    className="mb-4 mx-10 font-medium"
                  >
                    Select Doctor
      </Typography>
      <div className="text-center">
      <select onChange={onChange} className="w-11/12 px-2 py-[7.5px] rounded-md border-solid border-2 border-lightBlue-1000" label="Gender" name="doctor_id" id="mySelect">
      <option disabled selected>Doctor list</option>
      {alldoc && <>{alldoc.map((doctor, index) => {
                  const isLast = index === alldoc.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <option value={doctor.id}>{doctor.first_Name} {doctor.last_Name}, {doctor.Address}, {doctor.contact}, {doctor.gender} </option>
                  );
                })} </>}
            
          </select>
          </div>
          </div>
          <div className="mt-8">
      <Typography
                    variant="large"
                    color="blue-gray"
                    className="mb-4 mx-10 font-medium"
                  >
                    Select Patient
      </Typography>
      <div className="text-center">
      <select onChange={onChange} className="w-11/12 px-2 py-[7.5px] rounded-md border-solid border-2 border-lightBlue-1000" label="Gender" name="patient_id" id="mySelect">
            <option disabled selected>Patient list</option>
            {allpatient && <>{allpatient.map((patient, index) => {
                  const isLast = index === allpatient.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <option value={patient.id}>{patient.patient_First_Name} {patient.patient_Last_Name},{patient.address},{patient.contect}</option>
                  );
                })} </>}
          </select>
          </div>
          </div>
          </div>
      </div>
      <DialogFooter>
      <div className="flex justify-between w-full">
        <Button color="amber" className="mr-3 text-[14px] px-10" onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button color="amber" className={activeStep === 1 ? "hidden":"text-[14px] px-10"} onClick={handleNext} disabled={x}>
          Next
        </Button>
        <Button color="amber" onClick={Addappointment} className={activeStep === 1 ? "text-[14px] px-10":"hidden"} >
        Book
        {/* <span>
              {props.userDetails ?"Update Patient" : "Add Patient"}
        </span> */}
        </Button>
      </div>
      </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default DoctorsNameList;
