import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Loading} from "../Common/Loading/Loading";
import {CardPacksType, CardResponseType, getCardsTC, removeCardPackTC} from "../../bll/cards-reducer";
import Cards from "./Cards";
import { NewCardPack } from './NewCardPack/NewCardPack';

type ProfilePropsType = any

const CardsContainer = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const [showForm, setShoForm] = useState(false)
    const dispatch = useDispatch()

    const removeCardPack = (id: string) => {
        dispatch(removeCardPackTC(id))
    }

    const addCardPackHandler = () => {
        setShoForm(true)
    }

    useEffect(() => {
        dispatch(getCardsTC())
    }, [])


    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={'cards'}>
            {isLoading && <Loading/>}
            {showForm && <NewCardPack/>}
            <div>
                <div>
                    <h1>CARDS</h1>
                    <button onClick={addCardPackHandler} className="btn waves-effect waves-light" type="submit"
                            name="action">New Pack
                        <i className="material-icons right">add</i>
                    </button>
                </div>
                <Cards cards={cards} removeCardPack={removeCardPack}/>
            </div>
        </div>
    )
}

export default CardsContainer;
