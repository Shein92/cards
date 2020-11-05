import axios from 'axios'
import { CardResType } from '../bll/card-reducer';

const settings = {
	withCredentials: true
}

const instance = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	// baseURL: 'http://localhost:7542/2.0/',
	...settings
});

export const getCardAPI = {
	getCardsFromPack(packId: string, min: string = '1', max: string = '4', page: string = '1', pageCount: string = '7', cardAnswer: string = 'english', cardQuestion: string = 'english') {
		return instance.get(`cards/card?cardsPack_id=${packId}`)
	},
	addCard(packId: string, question?: string, answer?: string) {
		return instance.post<CardResType>('cards/card', {card: {cardsPack_id: packId, question, answer}})
	},
	removeCard(cardId: string) {
		return instance.delete(`cards/card?id=${cardId}`)
	},
	updateCard(cardId: string, question?: string, comments?: string) {
		return instance.put('cards/card', {card: {
			_id: cardId,
			question: question,
			comments: comments
		}})
	}
}
