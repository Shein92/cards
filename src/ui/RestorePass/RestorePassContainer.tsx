import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RestorePassStateType } from '../../bll/restorePas-reducer';
import { AppRootStateType } from '../../bll/store';
import RestorePass from './RestorePass';

const RestorePassContainer = () => {

	const restorePass = useSelector<AppRootStateType, RestorePassStateType>(state => state.restorePassword);
	const dispatch = useDispatch();

	return (
		<RestorePass/>
	)
}

export default RestorePassContainer;