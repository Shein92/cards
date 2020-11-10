import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import LoginContainer from '../Login/LoginContainer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProfileContainer from '../Profile/ProfileContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import ResetPassContainer from '../ResetPass/ResetPassContainer';
import RestorePassContainer from '../RestorePass/RestorePassContainer';
import {card, packs, login, profile, registration, resetPass, restorePass} from '../Routes/routes';
import PacksContainer from "../Packs/PacksContainer";
import CardContainer from '../Card/CardContainer';

const Main = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route path={login} render={() => <LoginContainer/>}/>
                <Route path={restorePass + '/:token'} render={() => <RestorePassContainer/>}/>
                <Route path={resetPass} render={() => <ResetPassContainer/>}/>
                <Route path={profile} render={() => <ProfileContainer/>}/>
                <Route path={packs} render={() => <PacksContainer/>}/>
                <Route path={card + '/:packId'} render={() => <CardContainer/>}/>
                <Route path={card} render={() => <CardContainer/>}/>
                <Route path={registration} render={() => <RegistrationContainer/>}/>
                <Route render={() => <PageNotFound/>}/>
            </Switch>
        </div>
    )
}

export default Main;
