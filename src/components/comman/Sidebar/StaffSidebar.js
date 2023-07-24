import React from 'react'
import Index from '../..'
import { NavLink } from 'react-router-dom'


const StaffSideBar = () => {

    const links = [
        {
            title: "Dashboard",
            icon: <Index.DashboardOutlined />,
            navigate: '/clinic/dashboard',
        },
        {
            title: "Patient",
            icon: <Index.AccessibilityNewIcon />,
            navigate: '/clinic/patient/list'
        },
        {
            title: "Doctors",
            // icon: <Index.AccessibilityNewIcon />,
            icon: <Index.MedicalServicesOutlined />,
            navigate: '/clinic/doctors/list'
        },
        {
            title: "Disable Slots",
            // icon: <Index.AccountCircleOutlinedIcon />,
            icon: <Index.AlarmOffIcon/>,
            navigate: '/clinic/Doctor_non_availability/list'
        },
        {
            title: "Appointments",
            // icon: <Index.AccountCircleOutlinedIcon />,
            icon: <Index.ContactPhoneOutlinedIcon />,
            navigate: '/clinic/appointment/list'
        },
        {
            title: "Medicine",
            icon: <Index.MedicationLiquidIcon />,
            navigate: '/clinic/medicine/list'
        },
    ]

    return (
        <>
            <Index.Card className="  left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xxl ">
                <div className="mb-2 p-4">
                    <Index.Typography variant="h5" color="blue-gray">

                    </Index.Typography>
                </div>
                <Index.List>
                    {links.map((link) => {
                        return (
                            <>
                                <NavLink to={link.navigate}>
                                    <Index.ListItem className='font-serif text-xl'>
                                        <Index.ListItemPrefix>
                                            {/* <Index.DashboardIcon /> */}
                                            {link.icon}
                                        </Index.ListItemPrefix>
                                        {link.title}
                                    </Index.ListItem>
                                </NavLink>
                            </>
                        )
                    })}
                </Index.List>
            </Index.Card></>
    )
}

export default StaffSideBar;