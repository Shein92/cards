
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../bll/store";
import { NavLink } from 'react-router-dom';
import { Paginator } from '../Common/Paginator/Paginator';
import {CardPacksType, CardResponseType, getCardsTC, setCountOnPageAC, setCurrentPageAC} from "../../bll/cards-reducer";
import {Paginator} from "../Common/Paginator/Paginator";



const Cards = (props: CardsPropsType) => {
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    const {cardPacksTotalCount, page, pageCount, packName, min, max, sortPacks} = useSelector<AppRootStateType, CardResponseType>(state => state.cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsTC(packName, min, max, '0updates', page, pageCount))
    }, [page, pageCount, packName, min, max, sortPacks, dispatch])

    const removeHandler = (id: string) => {
        props.removeCardPack(id)
    }

    const updateHandler = (id: string, name: string) => {
        props.updateHandler(id, name)
    }

    const onChangePage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    }

    const onChangeCountOnPage = (count: number) => {
        dispatch(setCountOnPageAC(count))
    }

    const rows = props.cards.map((card) =>
        <tr key={card._id}>

            <NavLink to={`card/${card._id}`}>
                <td>{card.name}</td>
            </NavLink>
            <td>{card.user_name}</td>
            <td>{card.cardsCount}</td>
            <td>{card.rating}</td>
            <td>{card.shots}</td>
            <td>
                <div>
                    <div>
                        <button style={{marginRight: '5px'}} disabled={userId !== card.user_id}
                                onClick={() => updateHandler(card._id, card.name)}
                                className="btn waves-effect waves-light" type="submit" name="action">
                            <i className="material-icons">edit</i>
                        </button>
                        <button disabled={userId !== card.user_id} onClick={() => removeHandler(card._id)}
                            className="btn red waves-effect waves-light" type="submit" name="action">
                            <i className="material-icons">delete_forever</i>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
    return (
        <div>
            <table className={"highlight"}>
                <thead>
                    <tr>
                        <th>Name <span>↓</span></th>
                        <th>User Name</th>
                        <th>Cards Count</th>
                        <th>Rating</th>
                        <th>Shots</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {/*Pagination*/}
            <div>
                <Paginator totalItemsCount={cardPacksTotalCount} pageSize={pageCount} currentPage={page}
                           portionsSize={10} onChangePage={onChangePage} onChangeCountOnPage={onChangeCountOnPage}/>
            </div>
        </div>
    )
}

export default Cards;


// types

type CardsPropsType = {
    cards: Array<CardPacksType>
    removeCardPack: (id: string) => void
    updateHandler: (id: string, name: string) => void
}
