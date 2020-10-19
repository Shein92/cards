import {authAPI} from "../api/cardsAPI";
import {Dispatch} from "redux";
import {setupProfileAC} from "./profile-reducer";
import {setIsLoggedAC} from "./app-reducer";

let initialState: LoginStateType = {
    isLogged: false,
    error: ''
}

export const loginReducer = (state: LoginStateType = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        case 'login/SET-ERROR-LOGIN':
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}


//Actions Creators
const setErrorLoginAC = (error: string) => {
    return {type: 'login/SET-ERROR-LOGIN', error} as const
}


// Thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setupProfileAC(res.data))
            dispatch(setIsLoggedAC(true))
        })
        .catch(e => {
            dispatch(setErrorLoginAC(e.message))
        })
}


// Types

export type LoginStateType = {
    isLogged: boolean
    error: string
}


export type ActionsType =
    | ReturnType<typeof setIsLoggedAC>
    | ReturnType<typeof setErrorLoginAC>
    | ReturnType<typeof setupProfileAC>;

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
