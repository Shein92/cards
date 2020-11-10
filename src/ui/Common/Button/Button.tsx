import React, { useCallback } from 'react';
import style from './Button.module.css';

type ButtonPropsType = {
	text: string,
	onClick?: () => void
	type?: "button" | "submit" | "reset" | undefined
	onSubmit?: () => void
};

const Button = React.memo((props: ButtonPropsType) => {

	const onClick = useCallback(() => {
		if (props.onClick) {
			props.onClick()
		}
	},[props])

	return (
		<button onClick={onClick}
			onSubmit={props.onSubmit}
			className={"btn waves-effect waves-light"}
			type={props.type}
		>{props.text}</button>
	)
})

export default Button;
