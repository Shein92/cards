import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Loading} from "../Common/Loading/Loading";
import {CardPacksType, CardResponseType, getCardsTC} from "../../bll/cards-reducer";
import Cards from "./Cards";

type ProfilePropsType = any

const CardsContainer = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardsTC())
    }, [])

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    console.log(cards)

    return (
        <div className={'cards'}>
            { isLoading && <Loading/> }
            <div>
                <div><h1>CARDS</h1></div>
              <Cards cards={cards}/>
            </div>
        </div>
    )
}

export default CardsContainer;
