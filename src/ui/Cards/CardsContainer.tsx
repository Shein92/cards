import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Loading} from "../Common/Loading/Loading";
import {CardPacksType, getCardsTC, removeCardPackTC} from "../../bll/cards-reducer";
import Cards from "./Cards";
import {NewCardPack} from './NewCardPack/NewCardPack';
import styles from "./Cards.module.css"
import {Modal} from "../Common/Modal/Modal";
import {EditCardPack} from './EditCardPack/EditCardPack';
import {useFormik} from 'formik';

type ProfilePropsType = any
let idPack: string
let namePack: string

const CardsContainer = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [modalUpdateActive, setUpdateModalActive] = useState<boolean>(false)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        onSubmit: (values) => {
            dispatch(getCardsTC(values.text))
        }
    })

    const removeCardPack = (id: string) => {
        dispatch(removeCardPackTC(id))
    }

    const updateHandler = (id: string, name: string) => {
        idPack = id
        namePack = name
        setUpdateModalActive(true)
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
            <div className={"col s6"}>
                <h1>CARDS</h1>
                <div className={"row"}>
                    <div className={"col s2"}>
                        <button onClick={() => setModalActive(true)} className="btn waves-effect waves-light"
                                type="submit"
                                name="action">New Pack
                            <i className="material-icons right">add</i>
                        </button>
                    </div>
                    <div className={"col s6"}>
                        <form className="col s12" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col s6">
                                    <input
                                        placeholder={'Text'}
                                        id="text"
                                        name="text"
                                        type="text"
                                        className="validate"
                                        {...formik.getFieldProps('text')}
                                    />
                                    <label htmlFor="text" className="active"/>
                                </div>
                                <div className={"col s4"}>
                                    <button className="btn waves-effect waves-light" type="submit"
                                            name="action">Search
                                        <i className="material-icons right">search</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Cards cards={cards} removeCardPack={removeCardPack} updateHandler={updateHandler}/>
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <NewCardPack setModalActive={setModalActive}/>
            </Modal>
            <Modal modalActive={modalUpdateActive} setModalActive={setUpdateModalActive}>
                {idPack && <EditCardPack id={idPack} name={namePack} setUpdateModalActive={setUpdateModalActive}/>}
            </Modal>
        </div>
    )
}

export default CardsContainer;
