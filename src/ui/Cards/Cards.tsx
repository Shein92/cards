import React from 'react';
import {CardPacksType} from "../../bll/cards-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";


const Cards = (props: CardsPropsType) => {
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    const removeHandler = (id: string) => {
        props.removeCardPack(id)
    }

    const updateHandler = (id: string, name: string) => {
        props.updateHandler(id, name)
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
                        <button style={{marginRight: '5px'}} disabled={userId !== card.user_id} onClick={() => updateHandler(card._id, card.name)}
                                className="btn waves-effect waves-light" type="submit" name="action">
                            <i className="material-icons">edit</i>
                        </button>
                        <button disabled={userId !== card.user_id} onClick={() => removeHandler(card._id)}
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


// types

type CardsPropsType = {
    cards: Array<CardPacksType>
    removeCardPack: (id: string) => void
    updateHandler: (id: string, name: string) => void
}
