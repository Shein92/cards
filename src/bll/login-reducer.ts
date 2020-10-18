import {authAPI} from "../api/cardsAPI";
import {Dispatch} from "redux";

let initialState: LoginStateType = {
    isLogged: false
}

export const loginReducer = (state: LoginStateType = initialState, action: ActionsType): LoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED":
            return {...state, isLogged: action.value}
        default: {
            return state
        }
    }
}


//Actions Creators
const setIsLoggedAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED', value})


// Thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedAC(true))
        })
        .catch(e => {
            console.log(e)
        })
}


// Types

export type LoginStateType = {
    isLogged: boolean
}


export type ActionsType = ReturnType<typeof setIsLoggedAC>;

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
