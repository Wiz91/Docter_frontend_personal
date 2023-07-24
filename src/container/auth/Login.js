import React, { useState } from "react";
import Lottie from 'react-lottie';
import { Spinner } from "@material-tailwind/react";
import animationData from './data.json'
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/Auth/AuthAction";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/Layout/Auth/Auth";
import Button from "../../components/comman/Button/Button";
const Login = (props) => {

    const [authDetails, setAuthDetails] = React.useState()
    // const [username, setusername] = React.useState()
    const [password, setpassword] = React.useState()

    const data = {
        email: 'yash@gmail.com'
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg'
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [show, toogleShow] = useState(false)
    

    const User = useSelector(state => state.login.accessToken)
    const login = useSelector(state => state.login.Login)
    // if (login == false){
        // alert(login)
        // return(
        //     <>
        //     <h1>Wait ....</h1>
        //     </>
        // )
        // toogleShow(false)
        // let element = document.getElementById("toogle");
        // element.innerHTML=" "
    // }
    const Loader = () =>{
        if(login ==false || login == true){
            // return(
            //     <>
            //     </>
            // )
            toogleShow(false)
        }
        return(
            <>
            {/* <div className="-mt-20 ml-20">
                        <Lottie
                        options={defaultOptions}
                        height={80}
                        width={200}
                        />
                        </div> */}
                        {/* <div className="-mt-20 ml-20"> */}
                        {/* <Spinner className="h-16 w-16 text-blue-500/10" /> */}
                        {/* </div> */}
                        <div className="w-96 h-auto flex items-center justify-center bg-white opacity-75 mr-10 -mt-8">
                        <Spinner className="h-16 w-16 text-blue-500/10 my-60 mr-8" />
                        </div>
                        {/* <div class="flex flex-col md:w-1/3 ml-auto mr-auto p-12 space-x-8 space-y-4 shadow-xl absolute z-10" >
                        <Spinner className="h-16 w-16 text-blue-500/10" />
                        </div> */}
            </>
        )
    }

    const onChange = (e) => {
        // const uname = document.getElementById("uname").value
        // const upass = document.getElementById("upass").value
        // if(uname.trim().length || upass.trim().length == 0)
        // {
        // toogleShow(false)
        // }
        setAuthDetails({ ...authDetails, [e.target.name]: e.target.value })
    }

    const LoginButton = async() => {
        const uname = document.getElementById("uname").value
        const upass = document.getElementById("upass").value
        // const login = await login
        if(uname.trim().length && upass.trim().length != 0)
        {
        toogleShow(true)
        }
        else{
            toogleShow(false)
        }
        dispatch(LoginAction(authDetails, navigate))
    }

    console.log("login ...",LoginButton)

    // React.useEffect(() => {

    //     if (User.token) {
    //         navigate('/dashboard')
    //     }

    // }, [])
    
    return (
        <>
            <AuthLayout>
                <div class="flex flex-col md:w-1/3 ml-auto mr-auto p-12 space-x-8 space-y-4 shadow-xl relative z-0" >
                    <div className="ml-auto mr-auto">
                        <img className="w-32" src='/images/logo.png' />
                    </div>
                    <hr />
                    <label for="email"><b>Email</b></label>
                    <input id="uname" onChange={onChange} name='email' className="p-4 bg-gray-100 rounded" type="text" placeholder="Enter Email" required />
                    <label for="psw"><b>Password</b></label>
                    <input id="upass" onChange={onChange} name='password' className="p-4 bg-gray-100 rounded" type="password" placeholder="Enter Password" required />

                    {/* <label for="psw-repeat"><b>Repeat Password</b></label>
                <input onChange={(event) => { setcfpassword(event.target.value) }} className="p-4 bg-gray-100 rounded" type="password" placeholder="Repeat Password" name="psw-repeat" required /> */}
                    <label>
                        <input type="checkbox" name="remember" style={{ marginTop: '20px' }} /> Remember me
                    </label>

                    <div class="clearfix w-full">
                        <Button text="Login" background="red-500" onClick={LoginButton} />
                        {/* <button onClick={LoginButton} type="submit" className="p-4 hover:bg-black w-40 bg-red-500 text-white text-bold" >Login</button> */}
                    </div>
                    <div class="absolute z-10">{show ? <div><Loader/></div> : null}</div>
                </div>
                
            </AuthLayout>
        </>
    )
}


export default Login;
