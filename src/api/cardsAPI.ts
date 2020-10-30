import axios from 'axios'
import {LoginParamsType} from "../bll/login-reducer";
import {AddCardPackForm} from "../ui/Cards/NewCardPack/NewCardPack";


const settings = {
    withCredentials: true
}

const instatce = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0',
    ...settings
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instatce.post('/auth/login', data)
    },

    authMe() {
        return instatce.post('/auth/me', {})
    },
    logout() {
        return instatce.delete('/auth/me', {})
    }
}

export const cardApi = {
    getCardPack() {
        return instatce.get('/cards/pack')
    },
    addCardPack(data: AddCardPackForm) {
        return instatce.post('/cards/pack', {cardsPack: data})
    },
    removeCardPack(id: string) {
        return instatce.delete(`/cards/pack?id=${id}`)
    },
    updateCardPack() {

    }
}
