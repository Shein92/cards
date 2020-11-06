
const initialState: AppStateType = {
    isLogged: false,
    isLoading: false,
    isRequestAuthMe: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED":
            return {...state, isLogged: action.value}
        case "login/SET-IS-LOADING":
            return {...state, isLoading: action.value}
        case "login/SET-IS-REQUEST-AUTH-ME":
            return {...state, isRequestAuthMe: true}
        default: {
            return state
        }
    }
}

// TYPES
export type AppStateType = {
    isLogged: boolean
    isLoading: boolean
    isRequestAuthMe: boolean
}

export type ActionsType =
    | ReturnType<typeof setIsLoggedAC>
    | ReturnType<typeof setIsRequestAuthMeAC>
    | ReturnType<typeof setIsLoadingAC>;


// ACTIONS CREATORS

export const setIsLoggedAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED', value} as const
}

export const setIsRequestAuthMeAC = (value: boolean) => {
    return {type: 'login/SET-IS-REQUEST-AUTH-ME', value} as const
}

export const setIsLoadingAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOADING', value} as const
}

// THUNKS
