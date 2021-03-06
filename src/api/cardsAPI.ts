import axios from 'axios'
import {LoginParamsType} from "../bll/login-reducer";
import {AddCardPackForm} from "../ui/Packs/NewPack/NewPack";
import {EditCardPackType} from "../ui/Packs/EditPack/EditPack";
import {UpdateCardPackType} from "../bll/packs-reducer";


const settings = {
    withCredentials: true
}

const instatce = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0',
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
    getCardPack(packName: string = '', min: number = 0, max: number = 100, sortPacks: string = '0updates', page: number = 1, pageCount: number = 10, user_id: string = '') {
        return instatce.get(`/cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${user_id}`)
    },
    addCardPack(data: AddCardPackForm) {
        return instatce.post('/cards/pack', {cardsPack: data})
    },
    removeCardPack(id: string) {
        return instatce.delete(`/cards/pack?id=${id}`)
    },
    updateCardPack(data: UpdateCardPackType) {
        return instatce.put(`cards/pack`, {cardsPack: data})
    }
}
