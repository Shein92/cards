import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { CardType, getCardTC, removeCardTC } from '../../bll/card-reducer';
import { AppRootStateType } from '../../bll/store';
import { Loading } from '../Common/Loading/Loading';
import { Modal } from '../Common/Modal/Modal';
import AddNewCard from './AddNewCard/AddNewCard';
import Card from './Card';
import EditCard from './EditCard/EditCard';
import {log} from "util";

type CardContainerPropsType = any
let idCard: string = '';
let cardName: string = '';
const CardContainer = (props: CardContainerPropsType) => {

	const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged);
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
	const card = useSelector<AppRootStateType, Array<CardType>>(state => state.card.cards);
	const [addNewCardModal, setAddNewCardModal] = useState(false);
	const [newCardNameModal,setNewCardNameModal] = useState(false);
	let { packId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCardTC(packId));
		// alert(packId);
	}, [])

	if (!isLogged) {
		return <Redirect to={'/login'} />
	}

	const updateCardName = (id: string, name: string) => {
		idCard = id;
		cardName = name;
		setNewCardNameModal(true);
	}

	const removeCard = (id: string) => {
		dispatch(removeCardTC(id));
	}

	// const card = [{
	// 	answer: 'henlo',
	// question: 'string',
	// cardsPack_id: 'string',
	// grade: 1,
	// rating: 2,
	// shots: 1,
	// type: 'card',
	// user_id: '123123lknkjgf',
	// created: 'lksdmfdslf',
	// updated: 'string',
	// __v: 1342412351231,
	// _id: 'dkfgkldnfgkjndsmds123j8',
	// }]

	return (
		<div>
			{/* {isLoading && <Loading />} */}
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
				{!!idCard && !!cardName && <EditCard id={idCard} name={cardName} setNewCardNameModal={setNewCardNameModal} packId={packId}/>}
			</Modal>
		</div>
	)
}



export default CardContainer
