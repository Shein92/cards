import axios from 'axios'
import { CardResType } from '../bll/card-reducer';

const settings = {
	withCredentials: true
}

const instance = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	...settings
});

export const getCardAPI = {
	getCardsFromPack(packId: string, min: string = '1', max: string = '4', page: string = '1', pageCount: string = '7', cardAnswer: string = 'english', cardQuestion: string = 'english') {
		return axios.get(`cards/card?cardAnswer=${cardAnswer}&cardQuestion=${cardQuestion}&cardsPack_id=${packId}&min=${min}&max=${max}&sortCards=0grade&page=${page}$pageCount=${pageCount}`)
	},
	addCard(packId: string, question?: string, answer?: string) {
		return axios.post<CardResType>('cards/card', {card: {cardsPack_id: packId, question, answer}})
	},
	removeCard(cardId: string) {
		return axios.delete(`cards/card?id=${cardId}`)
	},
	updateCard(cardId: string, question?: string, comments?: string) {
		return axios.put('cards/card', {card: {
			_id: cardId,
			question: question,
			comments: comments
		}})
	}
}
