import React from "react";
import {useFormik} from "formik";
import {addCardPackTC} from "../../../bll/cards-reducer";
import {useDispatch} from "react-redux";

export type AddCardPackForm = {
    name?: string,
    path?: string
}

type NewCardPackPropsType = {
    setModalActive: (value: boolean) => void
}

export const NewCardPack = ({setModalActive}: NewCardPackPropsType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            path: ''
        },
        onSubmit: (values) => {
            dispatch(addCardPackTC(values))
            setModalActive(false)
            values.name = ''
            values.path = ''
        }
    })

    return (
        <div className="row">
            <form className="col s12" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            placeholder={'Name'}
                            id="name"
                            name="name"
                            type="text"
                            className="validate"
                            {...formik.getFieldProps('name')}
                        />
                        <label htmlFor="name" className="active"/>
                    </div>
                    <div className="input-field col s6">
                        <input
                            placeholder={'Path'}
                            id="path"
                            name={"path"}
                            type="text"
                            className="validate"
                            {...formik.getFieldProps('path')}
                        />
                        <label htmlFor="path" className="active"/>
                    </div>
                    <div>
                        <button className="btn waves-effect waves-light" type="submit"
                                name="action">Create
                            <i className="material-icons right">add</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
