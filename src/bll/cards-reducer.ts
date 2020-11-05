import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk"
import {setIsLoadingAC, setIsLoggedAC} from "./app-reducer";
import {cardApi} from "../api/cardsAPI";
import {AddCardPackForm} from "../ui/Cards/NewCardPack/NewCardPack";
import {AppRootStateType} from "./store";


let initialState: CardResponseType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    page: 0,
    pageCount: 10,
    min: 0,
    max: 20,
    packName: '',
    sortPacks: '0updated',
    user_id: '',

}


export const cardsReducer = (state: CardResponseType = initialState, action: ActionsType): CardResponseType => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...action.cards}
        case 'cards/REMOVE-CARD-PACK':
            const newState = {...state, cardPacks: state.cardPacks.filter(cardPack => cardPack._id !== action.id)}
            return newState
        case "cards/SET-CURRENT-PAGE":
            return { ...state, page: action.currentPage }
        case "cards/SET-PAGE-COUNT":
            return { ...state, pageCount: action.count }
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
export const setCurrentPageAC = (currentPage: number) => ({ type: 'cards/SET-CURRENT-PAGE', currentPage } as const)
export const setCountOnPageAC = (count: number) => ({ type: 'cards/SET-PAGE-COUNT', count } as const)



// Thunks

export const getCardsTC = (packName?: string, min: number = 0, max: number = 100, sortPacks: string = '0updates', page: number = 1, pageCount: number = 10, user_id?: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsLoadingAC(true))
    cardApi.getCardPack(packName, min, max, sortPacks, page, pageCount, user_id)
        .then(res => {
            dispatch(setIsLoadingAC(false))
            dispatch(setCardsAC(res.data))
            // dispatch(setFilteronPageAC(sortPacks))
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
    cardsCount: number
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
    pageCount: number,
    packName: string,
    min: number,
    max: number,
    sortPacks: string,
    user_id: string,

}

export type InitialStateCardPacks = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    min: number
    max: number
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
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCountOnPageAC>
