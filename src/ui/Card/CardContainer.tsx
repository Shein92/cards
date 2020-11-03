import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { CardType, getCardTC } from '../../bll/card-reducer';
import { AppRootStateType } from '../../bll/store';
import { Loading } from '../Common/Loading/Loading';
import Card from './Card';

type CardContainerPropsType = any

const CardContainer = (props: CardContainerPropsType) => {

	const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged);
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
	const card = useSelector<AppRootStateType, Array<CardType>>(state => state.card.cards)
	let { cardId } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCardTC(cardId));
		alert(cardId);
	}, [])

	if (!isLogged) {
		return <Redirect to={'/login'} />
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
			{isLoading && <Loading />}
			<div>
				<h1>Card</h1>
				<button className="btn waves-effect waves-light" type="submit">New card
				<i className="material-icons right">add</i>
				</button>
				<Card card={card}/>
			</div>
		</div>
	)
}



export default CardContainer