import { Dispatch } from "redux";
import { restorePassAPI } from "../dal/API-restorePass";

export type RestorePassStateType = {
	answer: string,
	isRestored: boolean
}

type ChangeRestoreAnswerActionType = {
	type: 'restore/CHANGE-ANSWER',
	answer: string,
}
type isRestoredActionType = {
	type: 'restore/CHANGE-STATUS',
	isRestored: boolean,
}

export type ActionsType = ChangeRestoreAnswerActionType | isRestoredActionType;

const initialState: RestorePassStateType = {
	answer: '',
	isRestored: false
};

export const restorePasswordReducer = (state: RestorePassStateType = initialState, action: ActionsType): RestorePassStateType => {
	switch (action.type) {
		case "restore/CHANGE-ANSWER": {
			return { ...state, answer: action.answer }
		}
		default: {
			return state
		}
	}
}

//actions

export const changeRestoreAnswerAC = (text: string): ChangeRestoreAnswerActionType => {
	return { type: "restore/CHANGE-ANSWER", answer: text }
}

export const restoreSendAC = (send: boolean): isRestoredActionType => {
	return { type: "restore/CHANGE-STATUS", isRestored: send }
}

//thunk
export const restorePassTC = (password: string, token: string) => {
	return (dispatch: Dispatch) => {
		restorePassAPI.restorePass(password, token)
			.then(res => {
				dispatch(changeRestoreAnswerAC(res.data.info));
				dispatch(changeRestoreAnswerAC(res.data.error));
				dispatch(restoreSendAC(true))
			})
			.catch(err => {
				console.log(err.error);
			})
	}
}