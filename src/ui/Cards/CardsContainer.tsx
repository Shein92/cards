import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Loading} from "../Common/Loading/Loading";
import {CardPacksType, CardResponseType, getCardsTC, removeCardPackTC} from "../../bll/cards-reducer";
import Cards from "./Cards";
import {NewCardPack} from './NewCardPack/NewCardPack';
import styles from "./Cards.module.css"
import {Modal} from "../Modal/Modal";

type ProfilePropsType = any

const CardsContainer = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const [modalActive, setModalActive] = useState<boolean>(false)
    const dispatch = useDispatch()

    const removeCardPack = (id: string) => {
        dispatch(removeCardPackTC(id))
    }

    useEffect(() => {
        dispatch(getCardsTC())
    }, [])


    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={styles.cards}>
            {isLoading && <Loading/>}
            <div>
                <div>
                    <h1>CARDS</h1>
                    <button onClick={() => setModalActive(true)} className="btn waves-effect waves-light" type="submit"
                            name="action">New Pack
                        <i className="material-icons right">add</i>
                    </button>
                </div>
                <Cards cards={cards} removeCardPack={removeCardPack}/>
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <NewCardPack setModalActive={setModalActive}/>
            </Modal>
        </div>
    )
}

export default CardsContainer;
