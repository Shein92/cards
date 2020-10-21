import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { restorePassTC } from '../../bll/restorePas-reducer';
import { AppRootStateType } from '../../bll/store';
import { profile } from '../Routes/routes';

const RestorePassContainer = React.memo(() => {

	let answer = useSelector<AppRootStateType, string>(ans => ans.restorePassword.answer);
	const isRestored = useSelector<AppRootStateType, boolean>(ans => ans.restorePassword.isRestored);
	const dispatch = useDispatch();
	let { token } = useParams();

	type FormikErrorType = {
		password?: string
		secondPassword?: string
	}

	const formik = useFormik({
		initialValues: {
			password: '',
			secondPassword: ''
		},
		validate: (values) => {
			const errors: FormikErrorType = {};

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 7) {
				errors.password = 'Password must be more than 5 characters';
			}

			if (!values.secondPassword) {
				errors.secondPassword = 'Required'
			} else if (values.secondPassword.length < 7) {
				errors.secondPassword = 'Password must be more than 7 characters';
			}

			if (values.password !== values.secondPassword) {
				errors.secondPassword = 'Password should be the same!'
			}

			return errors;
		},
		onSubmit: values => {
			dispatch(restorePassTC(values.password, token))
		}
	});

	if (isRestored) { return <Redirect to={profile} /> }

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<input type="passwod"
						name={"password"}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.values.password ? <div style={{ color: 'red' }}>
						{formik.errors.password}
					</div> : null}
				</div>
				<div>
					<input type="passwod"
						name={"secondPassword"}
						onChange={formik.handleChange}
						value={formik.values.secondPassword}
					/>
					{formik.values.secondPassword ? <div style={{ color: 'red' }}>
						{formik.errors.secondPassword}
					</div> : null}
				</div>
				<div>
					<button type={"submit"}
						disabled={formik.values.password !== formik.values.secondPassword}
					>Send</button>
				</div>
			</form>
			<div>
				{answer}
			</div>
		</div>
	)

	// return (
	// 	<RestorePass/>
	// )
})

export default RestorePassContainer;