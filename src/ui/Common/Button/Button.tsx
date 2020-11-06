import React from 'react';
import style from './Button.module.css';

type ButtonPropsType = {
	text: string,
	onClick?: () => void
	type?: "button" | "submit" | "reset" | undefined
	onSubmit?: () => void
};

const Button = (props: ButtonPropsType) => {

	const onClick = () => {
		if (props.onClick) {
			props.onClick()
		}
	}

	return (
		<button onClick={onClick}
			onSubmit={props.onSubmit}
			className={"btn waves-effect waves-light"}
			type={props.type}
		>{props.text}</button>
	)
}

export default Button;
