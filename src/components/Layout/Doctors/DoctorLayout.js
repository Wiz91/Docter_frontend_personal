import React from "react";
import Index from '../../index'
// import SideBar from "../../comman/Sidebar/SideBar";
import DoctorSideBar from "../../comman/Sidebar/DoctorSideBar";
import DoctorHeader from "./DoctorsHeader";
// import StatsCard from "../../comman/StatsCard/StatsCard";


const DoctorLayout = ({children}) => {
    return (
        <>
            <Index.Card className="flex flex-col h-screen">
                <Index.Card>
                    <DoctorHeader />
                </Index.Card>
                <Index.Card className="flex  flex-row ">
                    <Index.Card className="w-[23vw]">
                        <DoctorSideBar />
                    </Index.Card>
                    <Index.Card className="w-[77vw] shadow-none">
                        {children}
                    </Index.Card>
                </Index.Card>
            </Index.Card>
        </>
    )
}

export default DoctorLayout;
