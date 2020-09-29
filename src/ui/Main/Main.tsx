import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LoginContainer from '../Login/LoginContainer';
import NewPassContainer from '../NewPass/NewPassContainer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProfileContainer from '../Profile/ProfileContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import RestorePassContainer from '../RestorePass/RestorePassContainer';
import { login, newPass, pageNotFound, profile, registration, restorePass } from '../Routes/routes';

const Main = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route path={login} render={() => <LoginContainer />} />
				<Route path={newPass} render={() => <NewPassContainer />} />
				<Route path={restorePass} render={() => <RestorePassContainer />} />
				<Route path={profile} render={() => <ProfileContainer />} />
				<Route path={registration} render={() => <RegistrationContainer />} />
				<Route path={pageNotFound} render={() => <PageNotFound/>}/>
			</Switch>
		</div>
	)
}

export default Main;