import React from 'react';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import style from './Login.module.css';

type LoginPropType = any

const Login = (props: LoginPropType) => {
	return (
		<div className={style.login}>
			<h2>Login Page</h2>
			<div>
				<Input value={'Choose the dark side'} onChange={(text: string) => console.log(text)} />
			</div>
			<div>
				<Button text={'we have cookies!:)'} onClick={() => alert('You have chosen wisely')} />
			</div>
		</div>
	)
}

export default Login;