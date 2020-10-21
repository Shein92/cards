import React from 'react';
import style from './Registration.module.css'
import inputStyle from "../Common/Input/Input.module.css";
import buttonStyle from "../Common/Button/Button.module.css";
import {useFormik} from "formik";
import { registrationTC} from "../../bll/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import { Redirect } from 'react-router-dom'

type RegistrationPropsType = any

const Registration = (props: RegistrationPropsType) => {

	const isRegistred = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistred);
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: '',
			password:''
		},
		onSubmit: values => {
			debugger
            dispatch(registrationTC(values))
		},
	})

   if(isRegistred){
   	return  <Redirect to={"/profile"} />
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
							   name = {'email'}
							   {...formik.getFieldProps('email')}
						/>
					</div>
					<div>
						<input className={inputStyle.inputStyle}
							   type={'password'}
							   placeholder={'Password'}
							   name={'password'}
							   {...formik.getFieldProps('password')}
						/>
					</div>
					<div>
						<button className={buttonStyle.btn}
								type={'submit'}
						>Registration
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Registration;