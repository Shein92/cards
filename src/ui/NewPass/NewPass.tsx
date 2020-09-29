import React from 'react';
import style from './NewPass.module.css';

type NewPassPropsType = any;

const NewPass = (props: NewPassPropsType) => {
	return (
		<div className={style.newPass}>
			<h2>New Password Page</h2>
		</div>
	)
}

export default NewPass;