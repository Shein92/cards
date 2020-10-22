
const initialState: AppStateType = {
    isLogged: false,
    isLoading: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED":
            return {...state, isLogged: action.value}
        case "login/SET-IS-LOADING":
            return {...state, isLoading: action.value}
        default: {
            return state
        }
    }
}

// TYPES
export type AppStateType = {
    isLogged: boolean
    isLoading: boolean
}

export type ActionsType =
    | ReturnType<typeof setIsLoggedAC>
    | ReturnType<typeof setIsLoadingAC>;


// ACTIONS CREATORS

export const setIsLoggedAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED', value} as const
}

export const setIsLoadingAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOADING', value} as const
}

// THUNKS
