import axios from 'axios';


const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
});

type RegistrationResponse = {
    error: string,
    method: string,
    url: string,
    query: {},
    body: {}
}

export type RegistrationParamsType = {
    email: string,
    password: string
}

export const registerAPI = {
    registration<RegistrationResponse>(data: RegistrationParamsType) {
        return instance.post('auth/register', {
            email: data.email,
            password: data.password
        })
    },
}

