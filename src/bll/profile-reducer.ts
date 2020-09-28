export type ProfileStateType = any

export type ActionsType = any;

const initialState: ProfileStateType = {}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
	switch(action.type) {
		default: {
			return state
		}
	}
}