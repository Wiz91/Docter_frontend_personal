import React from 'react'
import Index from '../..'
import { NavLink } from 'react-router-dom'


const DoctorSideBar = () => {

    const links = [
        {
            title: "Doctor Dashboard",
            icon: <Index.DashboardOutlined />,
            navigate: '/doctor/doctordashboard',
        },
        {
            title: "Appointments",
            icon: <Index.CalendarMonthOutlinedIcon />,
            navigate: '/doctor/self/appointment',
        },
        {
            title: "Patients",
            icon: <Index.AccessibleIcon />,
            navigate: '/doctor/self/patient/list',
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
                                <Index.ListItem className='text-xl font-serif'>
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

export default DoctorSideBar;
