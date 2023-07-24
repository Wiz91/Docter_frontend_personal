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
  Select,
  Option
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AddNewMedicineAction, UpdateStaffAction,GetMedicineListAction } from "../../../redux/Clinic/clinicActions";
import { useNavigate } from 'react-router-dom';


const AddMedicines = props => {
  const [open, setOpen] = useState(false);
  const [medicineDetails, setMedicineDetails] = React.useState({ name_of_medicine:"",manufacturer:"",strength:"",formulation:"",drug_Class:""});
  const token = useSelector(state => state.login.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);
  const addmedi = useSelector(state => state.clinic.addmedi);

  const AddMedicine = () => {
    const formData = new URLSearchParams();
    formData.append("name_of_medicine", medicineDetails.name_of_medicine);
    formData.append("manufacturer", medicineDetails.manufacturer);
    formData.append("strength", medicineDetails.strength);
    formData.append("formulation", medicineDetails.formulation);
    formData.append("drug_Class", medicineDetails.drug_Class);

    dispatch(AddNewMedicineAction(formData, token));
    handleOpen();
  };

if(addmedi==true){
  console.log(addmedi,"chkaddmedi")
  dispatch(GetMedicineListAction(token))
  navigate('/clinic/medicine/list')
}
  const onChange = e => {
    setMedicineDetails({
      ...medicineDetails,
      [e.target.name]: e.target.value
    });
  };

 

  const isButtonEnable = medicineDetails.name_of_medicine !== '' && medicineDetails.manufacturer !== '' && medicineDetails.strength !== '' && medicineDetails.formulation !== '' && medicineDetails.drug_Class !== '';

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Add Medicine
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Add Medicine
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            <div className="">
              <Input
                label="Name of Medicine"
                type="text"
                color="lightBlue"
                size="regular"
                name="name_of_medicine"
                value={medicineDetails.name_of_medicine}
                outline={true}
                onChange={onChange}
                required
              />
              </div>
              <div className="flex flex-row space-x-4">
              <Input
                label="Manufacturer"
                type="text"
                color="lightBlue"
                size="regular"
                name="manufacturer"
                onChange={onChange}
                value={medicineDetails.manufacturer}
                outline={true}
                required
              />
              <Input
                label="Strength"
                onChange={onChange}
                type="text"
                color="lightBlue"
                value={medicineDetails.strength}
                size="regular"
                name="strength"
                outline={true}
                required
              />
            </div>
            <div className="flex flex-row space-x-4">
            <select className="w-full px-2 py-[10px] rounded-md bg-[white] border-solid border-2 border-gray-300 text-sm text-gray-500" label="formulation" name="formulation" onChange={onChange} id="mySelect">
            <option disabled selected>Formulation *</option>
            <option value="tablet">tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
          </select>
          <select className="w-full px-2 py-[10px] rounded-md border-solid bg-[white] border-2 border-gray-300 text-sm text-gray-500" label="drug_Class" name="drug_Class" onChange={onChange} id="mySelect">
            <option disabled selected>Drug Class *</option>
            <option value="Biotic">Biotic</option>
            <option value="Antibiotic">Antibiotic</option>
          </select>
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
          <Button variant="gradient" color="green" disabled={!isButtonEnable} onClick={AddMedicine}>
            <span>
              Add Medicine
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddMedicines;
