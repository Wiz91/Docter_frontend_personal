import React from "react";
import Button from "../../comman/Button/Button";


const AuthHeader = () => {
    return (
        <>
            <div className="flex flex-row items-center  bg-gray-100 justify-between p-4">
                <div className="">
                    <h1 className="text-xl font-bold">Doctor's Click</h1>
                </div>
                <div className="">
                    <Button onClick={(e)=>{console.log(e.target)}} text="Join us" background="green-500" />
                </div>
            </div>
        </>
    )
}


export default AuthHeader;
