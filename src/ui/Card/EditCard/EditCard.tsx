import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getCardTC, updateCardNameTC } from '../../../bll/card-reducer';

type EditCardPropsType = {
	id: string,
	name: string,
	setNewCardNameModal: (value: boolean) => void,
	packId: string,

}

const EditCard = (props: EditCardPropsType) => {

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			id: props.id,
			question: props.name
		},
		onSubmit: (values) => {
			dispatch(updateCardNameTC(values.id, values.question, props.packId));
			props.setNewCardNameModal(false);
		}
	})

	return (
		<form className="col s12" onSubmit={formik.handleSubmit}>
			<div className="row">
				<div className="input-field col s12">
					<input
						placeholder={'Question'}
						id="question"
						name="question"
						type="text"
						className="validate"
						{...formik.getFieldProps('question')}
					/>
					<label htmlFor="question" className="active" />
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

export default EditCard;