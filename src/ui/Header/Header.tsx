import React from 'react';
import NavigationLink from '../Common/NavigationLink/NavigationLink';
import { login, newPass, profile, registration, restorePass } from '../Routes/routes';

const Header = () => {
	return (
		<nav>
			<NavigationLink to={login} title={"Login"}/>
			<NavigationLink to={newPass} title={"New password"}/>
			<NavigationLink to={restorePass} title={"Restore password"}/>
			<NavigationLink to={profile} title={"Profile"}/>
			<NavigationLink to={registration} title={"Registration"}/>
		</nav>
	)
}

export default Header;