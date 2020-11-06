import {authAPI} from "../api/cardsAPI";
import {Dispatch} from "redux";
import {setupProfileAC} from "./profile-reducer";
import {setIsLoadingAC, setIsLoggedAC, setIsRequestAuthMeAC} from "./app-reducer";

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
    dispatch(setIsLoadingAC(true))
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setupProfileAC(res.data))
            dispatch(setIsLoggedAC(true))
            dispatch(setIsRequestAuthMeAC(true))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
            dispatch(setErrorLoginAC(e.message))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setIsLoggedAC(false))
            dispatch(setIsRequestAuthMeAC(false))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
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
    | ReturnType<typeof setupProfileAC>
    | ReturnType<typeof setIsRequestAuthMeAC>
    | ReturnType<typeof setIsLoadingAC>;

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
