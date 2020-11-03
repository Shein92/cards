import React from 'react';
import { useSelector } from 'react-redux';
import { CardType } from '../../bll/card-reducer';
import { AppRootStateType } from '../../bll/store';

type CardPropsType = {
	card: Array<CardType>
}

const Card = (props: CardPropsType) => {

	const userId = useSelector<AppRootStateType, string>(state => state.profile._id)

	const rows = props.card.map(card => {
		return <tr key={card._id}>
			<td>{card.question}</td>
			<td>{card.answer}</td>
			<td>{card.rating}</td>
			<td>{card.updated}</td>
			<td>
				<div>
					<div>
						<button style={{ marginRight: '5px' }} disabled={userId !== card.user_id} onClick={() => alert(card._id)}
							className="btn waves-effect waves-light" type="submit" name="action">
							<i className="material-icons">edit</i>
						</button>
						<button disabled={userId !== card.user_id} onClick={() => alert(card._id)}
							className="btn red waves-effect waves-light" type="submit" name="action">
							<i className="material-icons">delete_forever</i>
						</button>
					</div>
				</div>
			</td>
		</tr>
	})
	return (
		<div>
			<table className={"highlight"}>
				<thead>
					<tr>
						<th>Question</th>
						<th>Answer</th>
						<th>Rating</th>
						<th>Updated</th>
						<th>Manage</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}

export default Card;