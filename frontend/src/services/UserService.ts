import {clientRequest} from '../utils/axiosClients' 

interface UserRegister{
    username: string,
    password: string,
    repeat_password: string
}

interface UserLogin {
    username: string,
    password: string
}

export default class UserService {
    static registerUser(data: UserRegister){
        return clientRequest({
            method:'post',
            url: '/user',
            data: data
        })
    }

    static login(data: UserLogin){
        return clientRequest({
            method:'post',
            url: '/login',
            data: data
        })
    }
}