import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileStateType } from '../../bll/profile-reducer';
import { AppRootStateType } from '../../bll/store';
import Profile from './Profile';

const ProfileContainer = () => {

	const profile = useSelector<AppRootStateType, ProfileStateType>(state => state.profile);
	const dispatch = useDispatch();

	return (
		<Profile />
	)
}

export default ProfileContainer;