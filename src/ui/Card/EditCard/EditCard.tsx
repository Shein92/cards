import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getCardTC, updateCardNameTC } from '../../../bll/card-reducer';

type EditCardPropsType = {
	id: string,
	name: string,
	setNewCardNameModal: (value: boolean) => void,
	packId: string,
	answer: string
}

const EditCard = (props: EditCardPropsType) => {

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			id: props.id,
			question: props.name,
			answer: props.answer
		},
		onSubmit: (values) => {
			dispatch(updateCardNameTC(values.id, values.question, props.packId, values.answer));
			props.setNewCardNameModal(false);
		}
	})

	// console.log(formik.values.answer);

	return (
		<form className="col s12" onSubmit={formik.handleSubmit}>
			<div className="row">
				<div className="input-field col s6">
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
				<div className="input-field col s6">
						<input
							placeholder={'Answer'}
							id="answer"
							name={"answer"}
							type="text"
							className="validate"
							{...formik.getFieldProps('answer')}
						/>
						<label htmlFor="answer" className="active" />
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