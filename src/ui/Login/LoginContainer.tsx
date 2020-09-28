import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStateType } from '../../bll/login-reducer';
import { AppRootStateType } from '../../bll/store';
import Login from './Login';

const LoginContainer = () => {

	const login = useSelector<AppRootStateType, LoginStateType>(state => state.login);
	const dispatch = useDispatch();

	return (
		<Login />
	)
}

export default LoginContainer;