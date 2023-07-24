import React from 'react'
import Index from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../../redux/Auth/AuthAction';
import { GetClinicProfileAction } from '../../../redux/Clinic/clinicActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react';


import { Fragment, useState } from "react";
import { grey, red } from '@mui/material/colors';


const ClinicHeader = () => {
    const accessToken = useSelector(state => state.login.accessToken)
    const userDetail = useSelector(state => state.login.userDetail)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);


    return (
        <>

            <Index.Card className="bg-gray-50 sticky  rounded-none flex flex-row items-center justify-between">

                <Index.Card className='bg-[#151718] rounded-none shadow-none w-[16rem] h-[87px] border-white border-b-[1px] px-8'>
                    <Index.Typography className='text-4xl text-white font-bold font-serif px-2 py-6'>
                        {userDetail.clinic_Name}
                    </Index.Typography>
                </Index.Card>
                <Index.Card className='bg-transparent shadow-none py-6'>
                <Fragment>
                    <div className='mb-3 flex gap-3'>
                        <Index.Menu placement="left-start" dismiss={true}>
                            <Index.MenuHandler>
                                <Index.Button
                                 className=" -my-6 hover:shadow-none shadow-none bg-transparent">
                                    {/* <Index.AccountCircleOutlinedIcon fontSize="large" sx={{ fontSize: 50, color:grey[600]}}/> */}
                                    <Avatar src={"https://sagar.pythonanywhere.com"+userDetail.image_and_logo} alt="avatar" withBorder={true} className="p-0.5 shadow-md" color="green" />
                                 </Index.Button>
                                </Index.MenuHandler>
                                <Index.MenuList>
                                    
                                    <Index.MenuItem className='font-medium  font-serif text-lg'>
                                    <Link to={'/clinic/ClinicProfile/Profile'}>    
                                       My Profile
                                </Link>
                                    </Index.MenuItem>
                                    <Index.MenuItem onClick={() => { dispatch(LogoutAction(navigate)) }} className="font-serif text-lg font-medium text-red-800">
                                            Logout
                                    </Index.MenuItem>
                                </Index.MenuList>
                        </Index.Menu>
                    </div>
                </Fragment>
                </Index.Card>
            </Index.Card> 

        </>
    )
}



export default ClinicHeader;