import React from 'react'
import Index from '../..'
// import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    const links = [
        {
            title: "Dashboard",
            icon: <Index.DashboardOutlined />,
            navigate: '/clinic/dashboard',
        },
        {
            title: "Staff",
            icon: <Index.PeopleAltOutlined />,
            navigate: '/clinic/staff/list',
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

            <Index.Card className="h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xxl bg-[#151718] rounded-none">
                <div className="mb-2 pl-5">
                    <Index.Typography variant="h5" color="blue-gray">
                     {/* <Index.IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    // sx={{ mr: 2 }}
                    >
                    <Index.MenuIcon />
                    </Index.IconButton> */}
                    </Index.Typography>
                </div>
                <Index.List>
                    {links.map((link) => {
                        return (
                            <>
                                <NavLink to={link.navigate}>
                                    <Index.ListItem className='font-serif text-xl text-[#8D8585] hover:text-[#FFFFFF] hover:bg-transparent rounded-none active:bg-transparent focus:bg-transparent focus-visible:border-l-4 focus:text-[#FFFFFF] active:text-[#FFFFFF] active:text-[#FFFFFF]'>
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

export default SideBar;
