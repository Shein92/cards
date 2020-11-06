import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Loading} from "../Common/Loading/Loading";
import {CardPacksType, getCardsTC, removeCardPackTC, setMinMaxValueAC} from "../../bll/cards-reducer";
import Packs from "./Packs";
import {NewPack} from './NewPack/NewPack';
import styles from "./Packs.module.css"
import {Modal} from "../Common/Modal/Modal";
import {EditPack} from './EditPack/EditPack';
import {useFormik} from 'formik';

type ProfilePropsType = any
let idPack: string
let namePack: string

const PacksContainer = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [modalUpdateActive, setUpdateModalActive] = useState<boolean>(false)
    const [filterById, setFilterById] = useState<boolean>(false)
    const [value, setValue] = useState<Array<number>>([0, 20])
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

    const myPackChangeHandler = (check: boolean) => {
        setFilterById(check)
    }

    const onChangeRange = (value: Array<number>) => {
        setValue(value)

    }

    const rangeHandler = () => {
        dispatch(setMinMaxValueAC(value))
    }

    // useEffect(() => {
    //     dispatch(getCardsTC())
    // }, [])


    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={styles.cards}>
            {isLoading && <Loading/>}
            <div className={"col s6"}>
                <h1>Packs</h1>
                <div className={"row"}>
                    <div className={"col s2"}>
                        <button onClick={() => setModalActive(true)} className="btn waves-effect waves-light"
                                type="submit"
                                name="action">New Pack
                            <i className="material-icons right">add</i>
                        </button>
                    </div>
                    <div className={"col s4"}>
                        <form className="col s12" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col s9">
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
                                <div className={"col s2"}>
                                    <button className="btn waves-effect waves-light" type="submit"
                                            name="action">Search
                                        <i className="material-icons right">search</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={"col s1"}>
                        <p>
                            <label>
                                <input
                                    onChange={e => myPackChangeHandler(e.target.checked)}
                                    type="checkbox"
                                    className="filled-in"
                                    name={'uid'}
                                    checked={filterById}
                                />
                                <span>My packs</span>
                            </label>
                        </p>
                    </div>
                    <div className={"col s3"}>
                        <span>From {value[0]} to {value[1]}</span>
                        <Range min={0} max={20} defaultValue={value} pushable={true} step={1}
                               onChange={onChangeRange}/>
                    </div>
                    <div className={"col s2"}>
                        <button onClick={rangeHandler} className="btn waves-effect waves-light"
                        >Apply
                            <i className="material-icons right">done</i>
                        </button>
                    </div>

                </div>

                <Packs cards={cards} removeCardPack={removeCardPack} updateHandler={updateHandler}
                       filterById={filterById}/>
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <NewPack setModalActive={setModalActive}/>
            </Modal>
            <Modal modalActive={modalUpdateActive} setModalActive={setUpdateModalActive}>
                {idPack && <EditPack id={idPack} name={namePack} setUpdateModalActive={setUpdateModalActive}/>}
            </Modal>
        </div>
    )
}

export default PacksContainer;
