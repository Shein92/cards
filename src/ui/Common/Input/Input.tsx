import React, { ChangeEvent } from 'react';
import style from './Input.module.css';

type InputPropsType = {
	value: string,
	onChange: (text: string) => void,
}

const Input = (props: InputPropsType) => {
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.currentTarget.value)
	}

	return (
		<input className={style.inputStyle} value={props.value}
			onChange={onChange}
		></input>
	)
}

export default Input;