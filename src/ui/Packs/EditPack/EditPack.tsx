import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {updateCardPackTC} from "../../../bll/cards-reducer";

export const EditPack = ({id, name, setUpdateModalActive}: EditCardPackType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            _id: id,
            name
        },
        onSubmit: async (values) => {
            try {
                await dispatch(updateCardPackTC(values))
                setUpdateModalActive(false)
            } catch (e) {
                console.log(e)
            }


        }
    })
    return (
        <form className="col s12" onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="input-field col s12">
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
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <button className="btn waves-effect waves-light" type="submit"
                            name="action">Update
                        <i className="material-icons right">update</i>
                    </button>
                </div>
            </div>
        </form>
    )
}


// types

export type EditCardPackType = {
    id: string
    name: string,
    setUpdateModalActive: (value: boolean) => void
}
