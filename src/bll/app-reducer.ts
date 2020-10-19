
const initialState: AppStateType = {
    isLogged: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED":
            return {...state, isLogged: action.value}
        default: {
            return state
        }
    }
}

// TYPES
export type AppStateType = {
    isLogged: boolean
}

export type ActionsType = ReturnType<typeof setIsLoggedAC>;


// ACTIONS CREATORS

export const setIsLoggedAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED', value} as const
}

// THUNKS
