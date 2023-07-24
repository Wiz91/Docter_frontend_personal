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
import { useDispatch, useSelector } from "react-redux";



const ViewMoreSelfPatientDetails = props => {
  const [open, setOpen] = useState(false);

  const accessToken = useSelector(state => state.login.accessToken)



  const handleOpen = () => setOpen(!open);



  return (
    <Fragment>
      <Button onClick={handleOpen} className="bg-[#29b6f6]">
        {props.userDetails ? "" : "View More Details"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {props.userDetails ? "" : "View More Details About Patient"}
        </DialogHeader>
        <DialogBody divider>
          <div className="overflow-auto max-h-[400px]">
              <table className="w-full min-w-max table-auto text-center">
              <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Weight</td>
                    <td className="border  border-blue-gray-100 p-3">{props.weight ? props.weight:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Medical conditions</td>
                    <td className="border  border-blue-gray-100 p-3">{props.medical_condition ? props.medical_condition:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Past Surgeries and Hospitalization</td>
                    <td className="border  border-blue-gray-100 p-3">{props.pastsurgery ? props.pastsurgery:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Known Allergy</td>
                    <td className="border  border-blue-gray-100 p-3">{props.knownallergy ? props.knownallergy:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Current Medications or Supplements</td>
                    <td className="border  border-blue-gray-100 p-3">{props.cuurent_med ? props.cuurent_med:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Current Symptoms or Issues</td>
                    <td className="border  border-blue-gray-100 p-3">{props.current_symptoms ? props.current_symptoms:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Current Symptoms Detail</td>
                    <td className="border  border-blue-gray-100 p-3">{props.current_symptom_detl ? props.current_symptom_detl:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Smoking or Tobacco or Alcohol</td>
                    <td className="border  border-blue-gray-100 p-3">{props.smoke_tobacco_alcohol ? "Yes" :"No"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Physical Activity</td>
                    <td className="border  border-blue-gray-100 p-3">{props.physical_activity ? props.physical_activity:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Diet</td>
                    <td className="border  border-blue-gray-100 p-3">{props.diet ? props.diet:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Mental Health</td>
                    <td className="border  border-blue-gray-100 p-3">{props.mental_Health ? props.mental_Health:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Immunization History</td>
                    <td className="border  border-blue-gray-100 p-3">{props.Immunization_History ? props.Immunization_History:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Woman Health</td>
                    <td className="border  border-blue-gray-100 p-3">{props.women_Health ? props.women_Health:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Other Health Concerns</td>
                    <td className="border  border-blue-gray-100 p-3">{props.other_Health_Concerns ? props.other_Health_Concerns:"-"}</td>
                </tr>
                <tr className="">
                    <td className=" border border-blue-gray-100 bg-blue-gray-50">Current Symptoms Started</td>
                    <td className="border  border-blue-gray-100 p-3">{props.current_symptoms_started ? props.current_symptoms_started:"-"}</td>
                </tr>
              </table>
          </div>
          {/* ); 
         })} </>}  */}
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
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default ViewMoreSelfPatientDetails;
