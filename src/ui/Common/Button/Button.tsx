import React from 'react';

type ButtonPropsType = {
	text: string,
	onClick: () => void
};

const Button = (props: ButtonPropsType) => {

	const onClick = () => {
		props.onClick();
	}

	return (
		<button onClick={onClick}>{props.text}</button>
	)
}

export default Button;