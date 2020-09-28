export type RegistrationStateType = any

export type ActionsType = any;

const initialState: RegistrationStateType = {}

export const registrationReducer = (state: RegistrationStateType = initialState, action: ActionsType): RegistrationStateType => {
	switch(action.type) {
		default: {
			return state
		}
	}
}