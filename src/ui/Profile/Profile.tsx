import React from 'react';
import style from './Profile.module.css';

type ProfilePropsType = any

const Profile = (props: ProfilePropsType) => {
	return (
		<div className={style.profile}>
			<h2>Profile Page</h2>
		</div>
	)
}

export default Profile;