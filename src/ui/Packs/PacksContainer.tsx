import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {CardPacksType, getCardsTC, removeCardPackTC, setMinMaxValueAC} from "../../bll/packs-reducer";
import Packs from "./Packs";
import {NewPack} from './NewPack/NewPack';
import styles from "./Packs.module.css"
import {Modal} from "../Common/Modal/Modal";
import {EditPack} from './EditPack/EditPack';
import {useFormik} from 'formik';

type ProfilePropsType = any
let idPack: string
let namePack: string

const PacksContainer = React.memo((props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const cards = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.cards.cardPacks)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.cards.maxCardsCount)
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [modalUpdateActive, setUpdateModalActive] = useState<boolean>(false)
    const [filterById, setFilterById] = useState<boolean>(false)
    const [value, setValue] = useState<Array<number>>([0, 0])
    const dispatch = useDispatch()
    useEffect(() => {
        setValue([0, maxCardsCount])
    }, [maxCardsCount, setValue])

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        onSubmit: (values) => {
            dispatch(getCardsTC(values.text))
        }
    })



    const removeCardPack = useCallback((id: string) => {
        dispatch(removeCardPackTC(id))
    },[dispatch]);

    const updateHandler = useCallback((id: string, name: string) => {
        idPack = id
        namePack = name
        setUpdateModalActive(true)
    },[])

    const myPackChangeHandler = useCallback((check: boolean) => {
        setFilterById(check)
    },[])

    const onChangeRange = useCallback((value: Array<number>) => {
        setValue(value);
    },[])

    const rangeHandler = useCallback(() => {
        dispatch(setMinMaxValueAC(value))
    },[dispatch, value])

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <div className={styles.cards}>
                <div className={"col s6"} style={{overflow: "hidden"}}>
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
                            <Range min={0} max={value[1]} value={value} pushable={true} step={1}
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
        </div>

    )
})

export default PacksContainer;
