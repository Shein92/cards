import React from 'react';
import style from './Registration.module.css'
import inputStyle from "../Common/Input/Input.module.css";
import buttonStyle from "../Common/Button/Button.module.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../bll/store";
import { Redirect } from 'react-router-dom'
import { registrationTC } from "../../bll/registration-reducer";
import {Loading} from "../Common/Loading/Loading";

type RegistrationPropsType = any

const Registration = (props: RegistrationPropsType) => {

	const isRegistred = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistred);
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
	const dispatch = useDispatch()

	type FormikErrorType = {
		email?: string,
		password?: string
		repeatPassword?: string
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			repeatPassword: ''
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = "Requires"
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = "Invalid email adress"
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 7) {
				errors.password = 'Password must be equal or more than 7 characters';
			}

			if (!values.repeatPassword) {
				errors.repeatPassword = 'Required'
			} else if (values.repeatPassword.length < 7) {
				errors.repeatPassword = 'Password must equal or be more than 7 characters';
			}

			if (values.password !== values.repeatPassword) {
				errors.repeatPassword = 'Password should be the same!'
			}

			return errors;
		},
		onSubmit: values => {
			dispatch(registrationTC({ email: values.email, password: values.password }))
		},
	})


	if (isRegistred) {
		return <Redirect to={"/profile"} />
	}

	return (
		<div className={style.registration}>
			<h2>Registration Page</h2>
			<div className={style.login}>
				<form onSubmit={formik.handleSubmit}>
					<div>
						<input className={inputStyle.inputStyle}
							type={'text'}
							placeholder={'E-mail'}
							name={'email'}
							{...formik.getFieldProps('email')}
						/>
						{formik.values.email ? <div style={{ color: "red" }}>
							{formik.errors.email}
						</div> : null}
					</div>
					<div>
						<input className={inputStyle.inputStyle}
							type={'password'}
							placeholder={'Password'}
							name={'password'}
							{...formik.getFieldProps('password')} />
						{formik.values.password ? <div style={{ color: 'red' }}>
							{formik.errors.password}
						</div> : null}
					</div>
					<div>
						<input className={inputStyle.inputStyle}
							type={'password'}
							placeholder={'Password'}
							name={'repeatPassword'}
							{...formik.getFieldProps('repeatPassword')} />
						{formik.values.repeatPassword ? <div style={{ color: 'red' }}>
							{formik.errors.repeatPassword}
						</div> : null}
					</div>
					<div>
						<button className={"btn waves-effect waves-light"}
							type={'submit'}
							disabled={formik.values.password !== formik.values.repeatPassword}
						>Registration
                        </button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Registration;
