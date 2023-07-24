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
  Input
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewDoctorAvailabilityAction, UpdateDoctorAvailabilityAction } from "../../../redux/Clinic/clinicActions";



const AddDoctorAvailabilities = props => {
  const [open, setOpen] = useState(false);
  const [doctorAvailabilityDetails, setdoctorAvailabilityDetails] = React.useState(
    props.userDetails
  );
  const token = useSelector(state => state.login.accessToken);

  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  const UpdateDoctorAvailability = () => {
    const formData = new URLSearchParams();
    formData.append("doctor_availability_date", doctorAvailabilityDetails.doctor_availability_date);
    formData.append("in_time", doctorAvailabilityDetails.in_time);
    formData.append("out_time", doctorAvailabilityDetails.out_time);

    dispatch(UpdateDoctorAvailabilityAction(doctorAvailabilityDetails, token));
    handleOpen();
  };

  const AddDoctorAvailability = () => {
    const formData = new URLSearchParams();
    formData.append("doctor_availability_date", doctorAvailabilityDetails.doctor_availability_date);
    formData.append("in_time", doctorAvailabilityDetails.in_time);
    formData.append("out_time", doctorAvailabilityDetails.out_time);

    dispatch(AddNewDoctorAvailabilityAction(formData, token));
    handleOpen();
  };

  const onChange = e => {
    setdoctorAvailabilityDetails({
      ...doctorAvailabilityDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        {props.userDetails ? "Edit Doctor Availability" : "Add Doctor Availability"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {props.userDetails ? "Update Doctor Availability" : "Add Doctor Availability"}
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            {/* <div className="flex flex-row space-x-4"> */}
            <div>
              <Input
                placeholder="Doctor Availability Date"
                type="text"
                color="lightBlue"
                size="regular"
                name="doctor_availability_date"
                value={doctorAvailabilityDetails.doctor_availability_date}
                outline={true}
                onChange={onChange}
              />
              </div>
              <div>
              <Input
                placeholder="In Time"
                type="text"
                color="lightBlue"
                size="regular"
                name="in_time"
                onChange={onChange}
                value={doctorAvailabilityDetails.in_time}
                outline={true}
              />
            </div>
            <div className="">
              <Input
                placeholder="Out Time"
                onChange={onChange}
                type="text"
                color="lightBlue"
                value={doctorAvailabilityDetails.out_time}
                size="regular"
                name="out_time"
                outline={true}
              />
            </div>
            {/* <div className="">
              <Input
                placeholder="Contact Number"
                onChange={onChange}
                type="number"
                color="lightBlue"
                size="regular"
                name="contact"
                value={doctorAvailabilityDetails.contact}
                outline={true}
              />
            </div>
            <div className="">
              <Input
                placeholder="Password"
                type="password"
                onChange={onChange}
                color="lightBlue"
                name="password"
                value={doctorAvailabilityDetails.password}
                size="regular"
                outline={true}
              />
            </div> */}
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
          <Button variant="gradient" color="green" onClick={props.userDetails ? UpdateDoctorAvailability : AddDoctorAvailability}>
            <span>
              {props.userDetails ? "Update Doctor Availability" : "Add Doctor Availability"}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddDoctorAvailabilities;
