import {authAPI} from "../api/cardsAPI";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

export type ProfileStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    verified: boolean
    rememberMe: boolean
    error: string
}

export type ActionsType = ReturnType<typeof setupProfileAC>;

const initialState: ProfileStateType = {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: NaN,
    created: null,
    updated: null,
    verified: false,
    rememberMe: false,
    error: ''
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET-UP-PROFILE':
            return {...state, ...action.data}
        default: {
            return state
        }
    }
}
//Actions Creators
export const setupProfileAC = (data: ProfileStateType) => {
    return {type: 'profile/SET-UP-PROFILE', data} as const
}

// Thunks
export const authMeTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.authMe()
        .then(res => {
            dispatch(setupProfileAC(res.data))
        })
        .catch(err => {
        })
}


// Types
