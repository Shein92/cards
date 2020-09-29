import React from 'react';
import NavigationLink from '../Common/NavigationLink/NavigationLink';
import { login, newPass, profile, registration, restorePass } from '../Routes/routes';
import style from './Header.module.css';

const Header = () => {
	return (
		<nav className={style.navigation}>
			<NavigationLink to={login} title={"Login"}/>
			<NavigationLink to={newPass} title={"New password"}/>
			<NavigationLink to={restorePass} title={"Restore password"}/>
			<NavigationLink to={profile} title={"Profile"}/>
			<NavigationLink to={registration} title={"Registration"}/>
		</nav>
	)
}

export default Header;