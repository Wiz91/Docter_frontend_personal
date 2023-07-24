import API from "../../config/API"
import DataService from "../../config/Dataservice"
import { handleError} from "./Comman"


export const LoginHandler = async (data) => {
    return DataService.post(API.Auth.Login, data ).then((res) => {
        return res.data
    }).catch((err) => {
        return handleError(err)
    })
}


export const ForgetPassword = async (data) => {
    return await DataService.post('').then((res) => {
        return res
    }).catch((err) => {
        return handleError(err.response.data)
    })
}


