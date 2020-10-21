import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassTC } from '../../bll/resetPass-reducer';
import { AppRootStateType } from '../../bll/store';
import { profile } from '../Routes/routes';
import style from './ResetPass.module.css';
import inputStyle from '../Common/Input/Input.module.css';
import btn from '../Common/Button/Button.module.css';

const ResetPassContainer = React.memo(() => {

	let answer = useSelector<AppRootStateType, string>(ans => ans.resetPassword.answer);
	let isReseted = useSelector<AppRootStateType, boolean>(ans => ans.resetPassword.isReseted);
	let dispatch = useDispatch();

	type FormikErrorType = {
		email?: string
	}

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = "Requires"
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = "Invalid email adress"
			}
			return errors;
		},
		onSubmit: values => {
			debugger;
			dispatch(resetPassTC(values.email));
		},
	});

	if (isReseted) return <Redirect to={profile} />

	return (
		<div className={style.resetPass}>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<span>Your email adress: </span>
				</div>
				<input className={inputStyle.inputStyle}
					name={'email'}
					type={"text"}
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				{formik.values.email ? <div style={{ color: "red" }}>
					{formik.errors.email}
				</div> : null}
				<div>
					<button className={btn.btn} 
					type={"submit"}>Submit</button>
				</div>
			</form>
			{answer}
		</div>
	);
})

export default ResetPassContainer;