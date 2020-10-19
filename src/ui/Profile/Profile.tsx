import React, {useEffect} from 'react';
import style from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {authMeTC, ProfileStateType} from "../../bll/profile-reducer";
import {AppRootStateType} from "../../bll/store";
import { Redirect } from 'react-router-dom';

type ProfilePropsType = any

const Profile = (props: ProfilePropsType) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const userInfo = useSelector<AppRootStateType, ProfileStateType>(state => state.profile)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={style.profile}>
            {/*<h2>Profile Page</h2>*/}
            <div>Email: {userInfo.email}</div>
            <div>Name: {userInfo.name}</div>
            <div>Created: {userInfo.created}</div>
            <div>publicCardPacksCount: {userInfo.publicCardPacksCount}</div>
        </div>
    )
}

export default Profile;
