import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import {CardType, getCardTC, removeCardTC} from '../../bll/card-reducer';
import {AppRootStateType} from '../../bll/store';
import {Modal} from '../Common/Modal/Modal';
import AddNewCard from './AddNewCard/AddNewCard';
import Card from './Card';
import EditCard from './EditCard/EditCard';

type CardContainerPropsType = any
let idCard: string = '';
let cardName: string = '';
let cardAnswer: string = ''
const CardContainer = React.memo((props: CardContainerPropsType) => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged);
    const card = useSelector<AppRootStateType, Array<CardType>>(state => state.card.cards);
    const [addNewCardModal, setAddNewCardModal] = useState(false);
    const [newCardNameModal, setNewCardNameModal] = useState(false);
    let {packId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardTC(packId));
    }, [])

    if (!packId) {
        return <Redirect to={"/packs"}/>
    }

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    const updateCardName = useCallback((id: string, name: string, answer: string) => {
        idCard = id;
        cardName = name;
        cardAnswer = answer;
        setNewCardNameModal(true);
    },[])

    const removeCard = useCallback((id: string) => {
        dispatch(removeCardTC(id));
    },[dispatch])

    return (
        <div>
            <div>
                <h1>Card</h1>
                <button onClick={() => setAddNewCardModal(true)}
                        className="btn waves-effect waves-light" type="submit">New card
                    <i className="material-icons right">add</i>
                </button>
                <Card card={card} updateCardName={updateCardName} removeCard={removeCard}/>
            </div>
            <Modal modalActive={addNewCardModal} setModalActive={setAddNewCardModal}>
                <AddNewCard setAddNewCardModal={setAddNewCardModal}
                            packId={packId}/>
            </Modal>
            <Modal modalActive={newCardNameModal} setModalActive={setNewCardNameModal}>
                {!!idCard && !!cardName &&
                <EditCard id={idCard} name={cardName} setNewCardNameModal={setNewCardNameModal} packId={packId} answer={cardAnswer}/>}
            </Modal>
        </div>
    )
})


export default CardContainer
