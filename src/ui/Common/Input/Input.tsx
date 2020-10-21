import React, {ChangeEvent} from 'react';
import style from './Input.module.css';

type InputPropsType = {
    value?: string,
    onChange: (text: string) => void,
    name?: string,
    placeholder?: string,
    type?: 'text' | 'password'
}

const Input = (props: InputPropsType) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value)
    }

    return (
        <input className={style.inputStyle} value={props.value}
               onChange={onChange} name={props.name} placeholder={props.placeholder}
               type={props.type}
        ></input>
    )
}

export default Input;
