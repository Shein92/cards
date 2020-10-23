import {Dispatch} from "redux";
import {registerAPI, RegistrationParamsType} from "../api/registrationApi";
import {setIsLoadingAC} from "./app-reducer";

export type RegistrationStateType = any

export type ActionsType = any;

const initialState: RegistrationStateType = {
    isRegistred: false
}

type InitialStateType = typeof initialState

export const registrationReducer = (state: RegistrationStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CREATE-REGISTRATION': {
            return {...state, isRegistred: action.value}
        }
        default: {
            return state
        }
    }
}

// actions
export const registrationAC = (value: boolean) =>
    ({type: 'CREATE-REGISTRATION', value} as const)

// thunks
export const registrationTC = (data: RegistrationParamsType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true))
    registerAPI.registration(data)
        .then(res => {
                dispatch(setIsLoadingAC(false))
                dispatch(registrationAC(true))
            }
        )
        .catch((err) => {
            dispatch(setIsLoadingAC(false))
        })
}

export const test111 = () => () => {
    debugger
}
