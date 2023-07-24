import React from "react";
import Index from '../../index'
import SideBar from "../../comman/Sidebar/SideBar";
import ClinicHeader from "./ClinicHeader";
// import StatsCard from "../../comman/StatsCard/StatsCard";
import { useSelector } from "react-redux";
import StaffSideBar from "../../comman/Sidebar/StaffSidebar";


const ClinicLayout = ({children}) => {

    const loginType = useSelector((state) => state.login.type);

    return (
        <>
            <Index.Card className="flex flex-col h-screen">
                <Index.Card>
                    <ClinicHeader />
                </Index.Card>
                <Index.Card className="flex  flex-row ">
                    <Index.Card className="w-[23vw] shadow-none">
                        { loginType == "CLINIC" ? <SideBar /> : <StaffSideBar /> }
                    </Index.Card>
                    <Index.Card className="w-[77vw]">
                        {children}
                    </Index.Card>
                </Index.Card>
            </Index.Card>
        </>
    )
}

export default ClinicLayout;