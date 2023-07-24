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
  Input
} from "@material-tailwind/react";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
// import { AddNewDoctorAction, UpdatedoctorAction } from "../../../redux/Doctor/doctorAction";
import { AddNewAppointmentAction,UpdateAppointmentAction,GetAppointmentListAction } from "../../../redux/Clinic/clinicActions";
import { useNavigate } from "react-router-dom";


const AddAppointments = props => {
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setappointmentDetails] = React.useState(
    props.userDetails
  );
  const token = useSelector(state => state.login.accessToken);

  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const alreayhasapp = useSelector(state => state.clinic.alreayhasapp);

  function chanagedateformate(date) {
    const inputDate = date;
  
    const dateParts = inputDate.split('-');
    
    const reformattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(reformattedDate);
    return reformattedDate 
    }

  const Updateappointment = () => {
    const formData = new URLSearchParams();
    formData.append("patient_id", appointmentDetails.patient_id);
    formData.append("slots", appointmentDetails.slots);
    formData.append("date_of_appointment", chanagedateformate(appointmentDetails.date_of_appointment));
   

    dispatch(UpdateAppointmentAction(appointmentDetails, token));
    handleOpen();
  };

  const Addappointment = () => {
    const formData = new URLSearchParams();
    formData.append("patient_id", appointmentDetails.patient_id);
    formData.append("slots", appointmentDetails.slots);
    formData.append("date_of_appointment", chanagedateformate(appointmentDetails.date_of_appointment));
    // console.log(formData,"docdata")
    dispatch(AddNewAppointmentAction(formData, token));
    handleOpen();
  };

  const onChange = e => {
    setappointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value
    });
  };

  // console.log(alreayhasapp,"chkall")
  // if(alreayhasapp==true){
  //   dispatch(GetAppointmentListAction(token));
  //   navigate('/clinic/appointment/list')
  //  }
  


  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        {props.userDetails ? "Edit Appointment" : "Add Appointment"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {props.userDetails ? "Update Appointment" : "Add Appointment"}
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            <div>
              <Input
                placeholder="Patient Id"
                type="text"
                color="lightBlue"
                size="regular"
                name="patient_id_id"
                value={appointmentDetails.patient_id}
                outline={true}
                onChange={onChange}
              />
              </div>
              <div>
              <Input
                placeholder="Slot"
                type="text"
                color="lightBlue"
                size="regular"
                name="slots"
                onChange={onChange}
                value={appointmentDetails.slots}
                outline={true}
              />
            </div>
            <div>
              <Input
                placeholder="Date of Appointment"
                type="date"
                color="lightBlue"
                size="regular"
                inputFormat="MM/dd/yyyy"
                pattern="\d{2}-\d{2}-\d{4}"
                name="date_of_appointment"
                onChange={onChange}
                value={appointmentDetails.date_of_appointment}
                outline={true}
              />
            </div>
          </div>
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
          <Button variant="gradient" color="green" onClick={props.userDetails ? Updateappointment : Addappointment}>
            <span>
              {props.userDetails ? "Update Appointment" : "Add Appointment"}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddAppointments;
