import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegistrationStateType } from '../../bll/registration-reducer';
import { AppRootStateType } from '../../bll/store';
import Registration from './Registration';

const RegistrationContainer = () => {

	const registration = useSelector<AppRootStateType, RegistrationStateType>(state => state.registration);
	const dispatch = useDispatch();

	return (
		<Registration/>
	)
}

export default RegistrationContainer;