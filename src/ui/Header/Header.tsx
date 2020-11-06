import React from 'react';
import NavigationLink from '../Common/NavigationLink/NavigationLink';
import {login, logout, newPass, profile, registration, resetPass, restorePass, cards, card} from '../Routes/routes';
import style from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {logoutTC} from "../../bll/login-reducer";


const Header = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <nav>
            <div className="nav-wrapper teal lighten-1">
                <ul id="nav-mobile" className="left hide-on-med-and-down  teal lighten-1">
                   <li>{isLogged ? <button onClick={logoutHandler}>Logout</button> : <NavigationLink to={login} title={"Login"}/>}</li>
                    <li><NavigationLink to={restorePass} title={"Restore password"}/></li>
                    <li><NavigationLink to={profile} title={"Profile"}/></li>
                    <li><NavigationLink to={cards} title={"Cards"}/></li>
                    <li><NavigationLink to={card} title={"Card"}/></li>
                    <li><NavigationLink to={resetPass} title={"Reset password"}/></li>
                    <li><NavigationLink to={registration} title={"Registration"}/></li>
                </ul>
            </div>
        </nav>
        // <nav className={style.navigation}>
        //     {isLogged ? <button onClick={logoutHandler}>Logout</button> : <NavigationLink to={login} title={"Login"}/>}
        //     {/* <NavigationLink to={newPass} title={"New password"}/> */}
        //     <NavigationLink to={restorePass} title={"Restore password"}/>
        //     <NavigationLink to={profile} title={"Profile"}/>
        //     <NavigationLink to={cards} title={"Cards"}/>
        //     <NavigationLink to={card} title={"Card"}/>
        //     <NavigationLink to={resetPass} title={"Reset password"}/>
        //     <NavigationLink to={registration} title={"Registration"}/>
        // </nav>
    )
}

export default Header;
