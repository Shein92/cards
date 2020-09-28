export type LoginStateType = any

export type ActionsType = any;

let initialState: LoginStateType = {}

export const loginReducer = (state: LoginStateType = initialState, action: ActionsType): LoginStateType => {
	switch(action.type) {
		default: {
			return state
		}
	}
}