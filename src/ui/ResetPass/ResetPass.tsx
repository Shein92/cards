import React, { useEffect } from 'react';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import {useDispatch} from "react-redux";
import { authMeTC } from '../../bll/profile-reducer';

type ResetPassPropsType = {
    value: string,
    onChange: (value: string) => void,
    onResetPassBtnClick: () => void,
    answer: string
}

const ResetPass = (props: ResetPassPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
		dispatch(authMeTC())
	}, [])

    const onChange = (value: string) => {
        props.onChange(value);
    }

    const onClick = () => {
        props.onResetPassBtnClick()
    }

    return (
        <div>
            <h2>Reset password:</h2>
            <div>
                <Input value={props.value} onChange={onChange}/>
            </div>
            <div>
                <Button text={"Reset password"} onClick={onClick}/>
            </div>
            <div>
                {props.answer}
            </div>
        </div>
    )
}

export default ResetPass;
