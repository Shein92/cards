import React from 'react';
import style from './Login.module.css';

type LoginPropType = any

const Login = (props: LoginPropType) => {
	return (
		<div className={style.login}>
			<h2>Login Page</h2>
		</div>
	)
}

export default Login;