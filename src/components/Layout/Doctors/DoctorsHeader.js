import React from 'react'
import Index from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../../redux/Auth/AuthAction';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from "react";
import { grey, red, green } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import { GetDoctorProfileAction } from '../../../redux/Doctor/doctorAction';
import {Avatar} from "@material-tailwind/react"



const DoctorHeader = () => {

    const accessToken = useSelector(state => state.login.accessToken);
    const userDetail = useSelector(state => state.login.userDetail)
    console.log(userDetail.first_name)

    const dispatch = useDispatch();
    const navigate = useNavigate();

   


    return (
        <>

<Index.Card className="bg-gray-50 px-12 py-8 rounded-none flex flex-row items-center justify-between ">

<Index.Card className='bg-gray-50 shadow-none'>
    <Index.Typography className='text-4xl font-bold font-serif'>
        Dr.{userDetail.first_Name}
    </Index.Typography>
</Index.Card>

{/* <Index.Card>

    <Index.Button onClick={() => { dispatch(LogoutAction(navigate)) }} className='bg-red-500 rounded-none'>
        Logout
    </Index.Button>

</Index.Card> */}

{/* <Index.card> */}
<Fragment>
    <div className='mb-3 flex gap-3'>
        <Index.Menu placement="left-start" dismiss={true}>
            <Index.MenuHandler>
                <Index.Button
                 className=" -my-6 hover:shadow-none shadow-none bg-transparent">
                    {/* <Index.AccountCircleOutlinedIcon fontSize="large" sx={{ fontSize: 50, color:green[600]}}/> */}
                    <Avatar  alt="avatar"src={ "https://sagar.pythonanywhere.com"+ userDetail.image_and_logo} withBorder={true} color="green" className="p-0.5"/>
                 </Index.Button>
                </Index.MenuHandler>
                <Index.MenuList>
                    
                    <Index.MenuItem className='font-semibold text-base font-serif'>
                    <Link to={'/doctor/DoctorProfile/DoctorProfile'}>
                    {/* <Index.ListItem> */}
                        
                       My Profile
                    {/* </Index.ListItem> */}
                </Link>
                    </Index.MenuItem>
                    <Index.MenuItem onClick={() => { dispatch(LogoutAction(navigate)) }} className="text-base font-semibold text-red-800 font-serif">
                        {/* <Index.MenuItem onClick={() => { dispatch(LogoutAction(navigate)) }} className='bg-transparent-500 rounded-none'> */}
                            Logout
                        {/* </Index.MenuItem> */}
                        {/*<Index.ExitToAppOutlinedIcon fontSize='large' sx={{ color: red[500] }}/>*/}
                    </Index.MenuItem>
                    
                    {/* <Index.MenuItem>Menu Item 3</Index.MenuItem> */}
                </Index.MenuList>
        </Index.Menu>
    </div>
</Fragment>
{/* </Index.card> */}


</Index.Card>
   

        </>
    )
}



export default DoctorHeader;
