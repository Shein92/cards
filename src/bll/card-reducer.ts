import { ThunkDispatch } from 'redux-thunk';
import { AppRootStateType } from './store';
import { Dispatch } from 'redux'
import { getCardAPI } from '../api/getCardAPI'
import { setIsLoadingAC } from './app-reducer'

const initialState: CardResType = {
	cards: [
		// 	{
		// 	answer: '',
		// 	question: '',
		// 	cardsPack_id: '',
		// 	grade: 0,
		// 	rating: 0,
		// 	shots: 0,
		// 	type: '',
		// 	user_id: '',
		// 	created: '',
		// 	updated: '',
		// 	__v: 0,
		// 	_id: ''
		// }
	],
	cardsTotalCount: 0,
	maxGrade: 0,
	minGrade: 0,
	page: 0,
	pageCount: 10,
	cardAnswer: '',
	cardQuestion: '',
	min: 0,
	max: 20
}

export const cardReducer = (state: CardResType = initialState, action: ActionsType): CardResType => {
	switch (action.type) {
		case 'card/GET-CARD': {
			return { ...state, cards: action.card.cards, cardsTotalCount: action.card.cardsTotalCount, maxGrade: action.card.maxGrade, minGrade: action.card.minGrade, page: action.card.page, pageCount: action.card.pageCount }
		}
		case 'card/REMOVE-CARD': {
			return { ...state, cards: state.cards.filter(card => card._id !== action.cardId) }
		}
		default: {
			return state
		}
	}
}

//Action Creators
export const setCardAC = (card: CardResType) => {
	return { type: 'card/GET-CARD', card } as const
}

export const removeCardAC = (cardId: string) => {
	return { type: 'card/REMOVE-CARD', cardId } as const
}

//Thunks

export const getCardTC = (cardId: string, min: string = '1', max: string = '4', page: string = '1', pageCount: string = '7', cardAnswer: string = 'english', cardQuestion: string = 'english') => {
	return (dispatch: Dispatch) => {
		dispatch(setIsLoadingAC(true))
		getCardAPI.getCardsFromPack(cardId, min, max, page, pageCount, cardAnswer, cardQuestion)
			.then(res => {
				dispatch(setIsLoadingAC(false));
				dispatch(setCardAC(res.data));
			})
			.catch(err => {
				dispatch(setIsLoadingAC(false));
				console.log(err.message)
			})
	}
}

export const addNewCardTC = (id: string, question?: string, answer?: string) => {
	return (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
		dispatch(setIsLoadingAC(true))
		getCardAPI.addCard(id, question, answer)
			.then(res => {
				dispatch(getCardTC(id));
				dispatch(setIsLoadingAC(false));
			})
			.catch(err => {
				dispatch(setIsLoadingAC(false));
				console.log(err.message)
			})
	}
}

export const removeCardTC = (id: string) => { 
	return (dispatch: Dispatch) => {
		dispatch(setIsLoadingAC(true));
		getCardAPI.removeCard(id)
			.then(res => {
				dispatch(removeCardAC(id));
				dispatch(setIsLoadingAC(false))
			})
			.catch(err => {
				dispatch(setIsLoadingAC(false));
				console.log(err.message);
			})
	}
}

export const updateCardNameTC = (id: string, name: string, packId: string) => {
	return (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
		dispatch(setIsLoadingAC(true));
		getCardAPI.updateCard(id, name)
		.then(res => {
			dispatch(setIsLoadingAC(false));
			dispatch(getCardTC(packId));
		})
		.catch(err => {
			dispatch(setIsLoadingAC(false));
			console.log(err.message);
		})
	}
}


type ActionsType =
	ReturnType<typeof setCardAC>
	| ReturnType<typeof setIsLoadingAC>
	| ReturnType<typeof removeCardAC>

export type CardResType = {
	cards: Array<CardType>,
	cardsTotalCount: number,
	maxGrade: number,
	minGrade: number,
	page: number
	pageCount: number,
	cardAnswer: string,
	cardQuestion: string,
	min: number,
	max: number
}

export type CardType = {
	answer: string
	question: string
	cardsPack_id: string
	grade: number
	rating: number
	shots: number
	type: string
	user_id: string
	created: string
	updated: string
	__v: number
	_id: string
}
