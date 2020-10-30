import React from 'react';
import {CardPacksType} from "../../bll/cards-reducer";

type CardsPropsType = {
    cards: Array<CardPacksType>
    removeCardPack: (id: string) => void
}

const Cards = (props: CardsPropsType) => {
    const removeHandler = (id: string) => {
        props.removeCardPack(id)
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
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            <i className="material-icons">edit</i>
                        </button>
                        <button onClick={() => removeHandler(card._id)} className="btn waves-effect waves-light" type="submit" name="action">
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
        </div>
    )
}

export default Cards;
