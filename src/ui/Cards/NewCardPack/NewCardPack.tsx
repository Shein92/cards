import React from "react";
import {useFormik} from "formik";
import {addCardPackTC} from "../../../bll/cards-reducer";
import {useDispatch} from "react-redux";

export type AddCardPackForm = {
    name?: string,
    path?: string
}

type NewCardPackPropsType = {}

export const NewCardPack = (props: NewCardPackPropsType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            path: ''
        },
        onSubmit: values => {
            dispatch(addCardPackTC(values))
        }
    })


    return (
        <div className="row">
            <form className="col s12" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="validate"
                            {...formik.getFieldProps('name')}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="path"
                            name={"path"}
                            type="text"
                            className="validate"
                            {...formik.getFieldProps('path')}
                        />
                        <label htmlFor="path">Path</label>
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
