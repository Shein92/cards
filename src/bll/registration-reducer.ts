import {Dispatch} from "redux";
import {registerAPI, RegistrationParamsType} from "../api/registrationApi";

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
    debugger
    registerAPI.registration(data)
        .then(res => {
                dispatch(registrationAC(true))
            }
        )
        .catch((err) => {
        })
}

export const test111 = () => () => {
    debugger
}
