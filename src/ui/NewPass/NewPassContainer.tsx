import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewPassStateType } from '../../bll/newPass-reducer';
import { AppRootStateType } from '../../bll/store';
import NewPass from './NewPass';

const NewPassContainer = () => {

	const newPass = useSelector<AppRootStateType, NewPassStateType>(state => state.newPassword);
	const dispatch = useDispatch();

	return (
		<NewPass />
	)
}

export default NewPassContainer;