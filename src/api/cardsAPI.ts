import axios from 'axios'
import {LoginParamsType} from "../bll/login-reducer";


const settings = {
    withCredentials: true
}

const instatce = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    ...settings
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instatce.post('/auth/login', data)
    },

    register(data: any) {
        return instatce.post('/auth/register', data)
    }
}
