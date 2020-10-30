import React from 'react';
import {CardPacksType} from "../../bll/cards-reducer";

type CardsPropsType = {
    cards: Array<CardPacksType>
}

const Cards = (props: CardsPropsType) => {
    const rows = props.cards.map((card: any) =>
        <tr key={card._id}>
            <td>{card.name}</td>
            <td>{card.user_name}</td>
            <td>{card.rating}</td>
            <td>{card.shots}</td>
            <td>Add/Delete</td>
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
        </div>
    )
}

export default Cards;
