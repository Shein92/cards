import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {NavLink} from 'react-router-dom';
import {Paginator} from '../Common/Paginator/Paginator';
import {CardPacksType, CardResponseType, getCardsTC, setCountOnPageAC, setCurrentPageAC} from "../../bll/packs-reducer";
import FilterBtn from '../Common/FilterBtn/FilterBtn';
import {Modal} from "../Common/Modal/Modal";


let PackId: string

const Packs = React.memo((props: CardsPropsType) => {
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    const {cardPacksTotalCount, page, pageCount, packName, min, max, sortPacks} = useSelector<AppRootStateType, CardResponseType>(state => state.cards)
    const dispatch = useDispatch()
    const [isNameOfPackArrowDown, setNameOfPackIsArrowDonw] = useState(false);
    const [isNameOfCreatorArrowDown, setIsNameOfCreatorArrowDonw] = useState(false);
    const [isQuantityOfCardsArrowDown, setIsQuantityOfCardsArrowDonw] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

    useEffect(() => {
        if (props.filterById)
            dispatch(getCardsTC(packName, min, max, sortPacks, page, pageCount, userId))
        else dispatch(getCardsTC(packName, min, max, sortPacks, page, pageCount))
    }, [page, pageCount, packName, min, max, sortPacks, props.filterById, dispatch]);

    const removeHandlerModal = useCallback((id: string) => {
        setShowRemoveModal(true)
        PackId = id
    },[])

    const removeHandler = useCallback(() => {
        if (PackId) {
            props.removeCardPack(PackId)
            setShowRemoveModal(false)
            PackId = ''
        }
    },[props])

    const updateHandler = useCallback((id: string, name: string) => {
        props.updateHandler(id, name)
    },[props])

    const onChangePage = useCallback((currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    },[dispatch])

    const onChangeCountOnPage = useCallback((count: number) => {
        dispatch(setCountOnPageAC(count))
    },[dispatch])

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
                        <button disabled={userId !== card.user_id} onClick={() => removeHandlerModal(card._id)}
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
                    <th>Name <FilterBtn filterDown={'0name'} filterUp={'1name'} isArrowDown={isNameOfPackArrowDown}
                                        setIsArrowDown={setNameOfPackIsArrowDonw}
                                        max={max}
                                        min={min}
                                        page={page}
                                        pageCount={pageCount}
                    /></th>
                    <th>User Name <FilterBtn filterDown={'0user_name'} filterUp={'1user_name'}
                                             isArrowDown={isNameOfCreatorArrowDown}
                                             setIsArrowDown={setIsNameOfCreatorArrowDonw}
                                             max={max}
                                             min={min}
                                             page={page}
                                             pageCount={pageCount}
                    /></th>
                    <th>Cards Count <FilterBtn filterDown={'0cardsCount'} filterUp={'1cardsCount'}
                                               isArrowDown={isQuantityOfCardsArrowDown}
                                               setIsArrowDown={setIsQuantityOfCardsArrowDonw}
                                               max={max}
                                               min={min}
                                               page={page}
                                               pageCount={pageCount}
                    /></th>
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
                {cardPacksTotalCount > pageCount &&
                <Paginator totalItemsCount={cardPacksTotalCount} pageSize={pageCount} currentPage={page}
                           portionsSize={10} onChangePage={onChangePage} onChangeCountOnPage={onChangeCountOnPage}/>
                }

            </div>
            <Modal modalActive={showRemoveModal} setModalActive={setShowRemoveModal}>
                <div className={"container valign-wrapper center-align"}>
                    <div className={"row"}>
                        <div className={"col s12"}>
                            <h5>Do you really want to delete this pack?</h5>
                        </div>
                        <div className={"col s6"}>
                            <button onClick={removeHandler}
                                    className={"btn waves-effect waves-light"}>Yes
                            </button>
                        </div>
                        <div className={"col s6"}>
                            <button onClick={() => setShowRemoveModal(false)}
                                    className={"btn red waves-effect waves-light"}>No
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default Packs;


// types

type CardsPropsType = {
    cards: Array<CardPacksType>
    filterById: boolean
    removeCardPack: (id: string) => void
    updateHandler: (id: string, name: string) => void
}
