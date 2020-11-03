import React from 'react'
import { Dispatch } from 'redux'
import { getCardAPI } from '../api/getCardAPI'
import { setIsLoadingAC } from './app-reducer'

const initialState: CardResType = {
	cards: [{
		answer: '',
		question: '',
		cardsPack_id: '',
		grade: 0,
		rating: 0,
		shots: 0,
		type: '',
		user_id: '',
		created: '',
		updated: '',
		__v: 0,
		_id: ''
	}],
	cardsTotalCount: 0,
	maxGrade: 0,
	minGrade: 0,
	page: 0,
	pageCount: 0
}

export const cardReducer = (state: CardResType = initialState, action: ActionsType): CardResType => {
	switch (action.type) {
		case 'card/GET-CARD': {
			return {...state, cards: action.card.cards, cardsTotalCount: action.card.cardsTotalCount, maxGrade: action.card.maxGrade, minGrade: action.card.minGrade, page: action.card.page, pageCount: action.card.pageCount}
		}
		default: {
			return state
		}
	}
}

//Action Creators
export const setCardAC = (card: CardResType) => {
    return {type: 'card/GET-CARD', card} as const
}

//Thunks

export const getCardTC = (cardId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setIsLoadingAC(true))
		getCardAPI.getCardsFromPack(cardId)
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


type ActionsType = ReturnType<typeof setCardAC>

export type CardResType = {
	cards: Array<CardType>,
	cardsTotalCount: number,
	maxGrade: number,
	minGrade: number,
	page: number
	pageCount: number
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