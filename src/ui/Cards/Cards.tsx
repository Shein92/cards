import React, {useEffect} from 'react';
import {CardPacksType, CardResponseType, getCardsTC, setCurrentPageAC} from "../../bll/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
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

    const rows = props.cards.map((card) =>
        <tr key={card._id}>
            <td>{card.name}</td>
            <td>{card.user_name}</td>
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
                    <th>Name</th>
                    <th>User Name</th>
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
                           portionsSize={10} onChangePage={onChangePage}/>
                <div className={"pagination"}>
                    <select className="browser-default">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
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
