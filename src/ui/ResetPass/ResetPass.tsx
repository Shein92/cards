import React from 'react';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import {Loading} from "../Common/Loading/Loading";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

type ResetPassPropsType = {
    value: string,
    onChange: (value: string) => void,
    onResetPassBtnClick: () => void,
    answer: string
}

const ResetPass = (props: ResetPassPropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const onChange = (value: string) => {
        props.onChange(value);
    }

    const onClick = () => {
        props.onResetPassBtnClick()
    }

    return (
        <div>
            { isLoading && <Loading />}
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
