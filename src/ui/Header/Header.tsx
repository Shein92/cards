import React, { useCallback } from 'react';
import NavigationLink from '../Common/NavigationLink/NavigationLink';
import { login, packs, profile, registration, resetPass } from '../Routes/routes';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../bll/store";
import { logoutTC } from "../../bll/login-reducer";


const Header = React.memo(() => {

	const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged)
	const dispatch = useDispatch()
	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())
	},[dispatch])


	let content = <div className="nav-wrapper teal lighten-1">
		<ul id="nav-mobile" className="left hide-on-med-and-down  teal lighten-1">
			<li>{isLogged ?
				<button className={"btn btn-flat teal lighten-1"} onClick={logoutHandler}>Logout</button> :
				<NavigationLink to={login} title={"Login"} />}</li>
			{/* <li><NavigationLink to={restorePass} title={"Restore password"} /></li> */}
			<li><NavigationLink to={profile} title={"Profile"} /></li>
			<li><NavigationLink to={packs} title={"Packs"} /></li>
		</ul>
	</div>;

	if(!isLogged) {
		content = <div className="nav-wrapper teal lighten-1">
		<ul id="nav-mobile" className="left hide-on-med-and-down  teal lighten-1">
			<li>{isLogged ?
				<button className={"btn btn-flat teal lighten-1"} onClick={logoutHandler}>Logout</button> :
				<NavigationLink to={login} title={"Login"} />}</li>
			<li><NavigationLink to={resetPass} title={"Reset password"} /></li>
			<li><NavigationLink to={registration} title={"Registration"} /></li>
		</ul>
	</div>
	}

	return (
		<nav>
			{content}
		</nav>
	)
})

export default Header;
