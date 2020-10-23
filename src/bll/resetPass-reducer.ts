import { resetPassAPI } from '../api/resetPassAPI';
import { Dispatch } from "redux";
import {setIsLoadingAC} from "./app-reducer";

export type ResetPassStateType = {
	answer: string,
	isReseted: boolean
}

type ChangeAnswerActionType = {
	type: "reset/CHANGE-ANSWER",
	answer: string
}
type IsResetSentActionType = {
	type: "reset/CHANGE-STATUS",
	isReseted: boolean
}

export type ActionsType = ChangeAnswerActionType | IsResetSentActionType;

const initialState: ResetPassStateType = {
	answer: '',
	isReseted: false
};

export const resetPasswordReducer = (state: ResetPassStateType = initialState, action: ActionsType): ResetPassStateType => {
	switch (action.type) {
		case "reset/CHANGE-ANSWER": {
			return { ...state, answer: action.answer }
		}
		case "reset/CHANGE-STATUS": {
			return {...state, isReseted: action.isReseted}
		}
		default: {
			return state
		}
	}
}

//actions
export const changeResetAnswerAC = (text: string): ChangeAnswerActionType => {
	return { type: "reset/CHANGE-ANSWER", answer: text }
}
export const resetSendAC = (send: boolean): IsResetSentActionType => {
	return { type: "reset/CHANGE-STATUS", isReseted: send }
}

//thunk
export const resetPassTC = (email: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setIsLoadingAC(true))
		resetPassAPI.resetPass(email)
			.then(res => {
				dispatch(setIsLoadingAC(false))
				dispatch(changeResetAnswerAC(res.data.info));
			})
			.catch(err => {
				dispatch(setIsLoadingAC(false))
				dispatch(changeResetAnswerAC(err.message));
				console.log(err);
			})
	}
}
