import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSendAC } from '../../bll/restorePas-reducer';
import { AppRootStateType } from '../../bll/store';
import Profile from './Profile';

const ProfileContainer = () => {

	const isRestored = useSelector<AppRootStateType, boolean>(ans => ans.restorePassword.isRestored); 
	const dispatch = useDispatch();

	if(isRestored) dispatch(restoreSendAC(false))

	return (
		<Profile />
	)
}

export default ProfileContainer;