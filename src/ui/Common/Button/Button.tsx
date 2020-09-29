import React from 'react';
import style from './Button.module.css';

type ButtonPropsType = {
	text: string,
	onClick: () => void
};

const Button = (props: ButtonPropsType) => {

	const onClick = () => {
		props.onClick();
	}

	return (
		<button onClick={onClick} className={style.btn}>{props.text}</button>
	)
}

export default Button;