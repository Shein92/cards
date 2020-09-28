import React, { ChangeEvent } from 'react';

type InputPropsType = {
	value: string,
	onChange: (text: string) => void,
}

const Input = (props: InputPropsType) => {
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.currentTarget.value)
	}

	return (
		<input value={props.value}
			onChange={onChange}
		></input>
	)
}

export default Input;