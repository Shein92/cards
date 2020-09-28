export type RestorePassStateType = any

export type ActionsType = any;

const initialState: RestorePassStateType = {};

export const restorePasswordReducer = (state: RestorePassStateType = initialState, action: ActionsType): RestorePassStateType => {
	switch(action.type) {
		default: {
			return state
		}
	}
}