import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk"
import {setIsLoadingAC, setIsLoggedAC} from "./app-reducer";
import {cardApi} from "../api/cardsAPI";
import {AddCardPackForm} from "../ui/Cards/NewCardPack/NewCardPack";
import {AppRootStateType} from "./store";


let initialState: CardResponseType = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            user_name: '',
            path: '',
            grade: 0,
            shots: 0,
            rating: 0,
            type: '',
            created: '',
            updated: '',
            __v: 0
        }
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    page: 0,
    pageCount: 0
}


export const cardsReducer = (state: CardResponseType = initialState, action: ActionsType): CardResponseType => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...action.cards}
        case 'cards/REMOVE-CARD-PACK':
            const newState = {...state, cardPacks: state.cardPacks.filter(cardPack => cardPack._id !== action.id)}
            return newState
        default: {
            return state
        }
    }
}


//Actions Creators
const setCardsAC = (cards: CardResponseType) => {
    return {type: 'cards/GET-CARDS', cards} as const
}

const setRemoveCardPack = (id: string) => {
    return {type: 'cards/REMOVE-CARD-PACK', id} as const
}


// Thunks
export const getCardsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    cardApi.getCardPack()
        .then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
        })
}

export const removeCardPackTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    cardApi.removeCardPack(id)
        .then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setRemoveCardPack(id))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
        })
}

export const addCardPackTC = (data: AddCardPackForm) => (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    cardApi.addCardPack(data)
        .then(res => {
            dispatch(getCardsTC())
            dispatch(setIsLoadingAC(false))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
        })
}

export const updateCardPackTC = (data: UpdateCardPackType) => (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    cardApi.updateCardPack(data)
        .then(res => {
            dispatch(getCardsTC())
            dispatch(setIsLoadingAC(false))
        })
        .catch(e => {
            dispatch(setIsLoadingAC(false))
        })
}


// Types

export type CardPacksType = {
    _id: string,
    user_id: string,
    user_name: string,
    name: string,
    path: string,
    grade: number,
    shots: number,
    rating: number,
    type: string,
    created: string,
    updated: string,
    __v: number
}

export type CardResponseType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    page: number
    pageCount: number
}

export type UpdateCardPackType = {
    _id: string
    name: string
}

export type ActionsType =
    | ReturnType<typeof setIsLoggedAC>
    | ReturnType<typeof setIsLoadingAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setRemoveCardPack>

