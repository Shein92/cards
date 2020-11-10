import React, {ChangeEvent, useCallback} from 'react';
import style from './Input.module.css';

type InputPropsType = {
	value?: string,
	onChange?: (text: string) => void,
	type?: string,
	name?: string
}

const Input = React.memo((props: InputPropsType) => {

	const onChange = useCallback((event: React.ChangeEvent<any>) => {
		debugger
		if (props.onChange) {
			props.onChange(event.currentTarget.value)
		}
	},[props])

	return (
		<input className={style.inputStyle} value={props.value}
			onChange={onChange} type={props.type} name={props.name}
		></input>
	)
})

export default Input;
