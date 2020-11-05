import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewCardTC } from '../../../bll/card-reducer';

type AddNewCardPropsType = {
	setAddNewCardModal: (value: boolean) => void,
	packId: string
}

const AddNewCard = (props: AddNewCardPropsType) => {

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			question: '',
			answer: ''
		},
		onSubmit: (values) => {
			dispatch(addNewCardTC(props.packId, values.question, values.question))
			props.setAddNewCardModal(false);
			values.answer = '';
			values.question = ''
		}
	})

	return (
		<div className="row">
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
					<div>
						<button className="btn waves-effect waves-light" type="submit"
							name="action">Add card
                            <i className="material-icons right">add</i>
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AddNewCard;