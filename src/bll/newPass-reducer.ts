export type NewPassStateType = any

export type ActionsType = any;

const initialState = {}

export const newPasswordReducer = (state: NewPassStateType = initialState, action: ActionsType): NewPassStateType => {
	switch(action.type) {
		default: {
			return state
		}
	}
}