import React from 'react';
import style from './Login.module.css';
import inputStyle from '../Common/Input/Input.module.css'
import buttonStyle from '../Common/Button/Button.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/login-reducer";
import {AppRootStateType} from "../../bll/store";
import { Redirect } from 'react-router-dom';

type LoginPropType = any

const Login = (props: LoginPropType) => {
	const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLogged)
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: values => {
			dispatch(loginTC(values))
		}
	})

	if (isLogged) return <Redirect to={'/profile'}/>

	return (
		<div className={style.login}>
			<h2>Login Page</h2>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<input className={inputStyle.inputStyle}
					name={'email'}
					type={'text'}
					{...formik.getFieldProps('email')}
					/>
				</div>
				<div>
					<input className={inputStyle.inputStyle}
						name={'password'}
						type={'password'}
						{...formik.getFieldProps('password')}
					/>
				</div>
				<div>
					<span>Remember Me </span>
					<input type={'checkbox'}
						   {...formik.getFieldProps('rememberMe')}
						checked={formik.values.rememberMe}
					/>
				</div>
				<div>
					<button className={buttonStyle.btn}
						type={'submit'}
					>Login</button>
				</div>
			</form>
			<div>
				{/*<Input value={'Choose the dark side'} onChange={(text: string) => console.log(text)}/>*/}
			</div>
			<div>
				{/*<Button text={'we have cookies!:)'} onClick={() => alert('You have chosen wisely')} />*/}
			</div>
		</div>
	)
}

export default Login;
