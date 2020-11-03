import { restorePasswordReducer } from './restorePas-reducer';
import { registrationReducer } from './registration-reducer';
import { profileReducer } from './profile-reducer';
import { newPasswordReducer } from './newPass-reducer';
import { loginReducer } from './login-reducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import { resetPasswordReducer } from './resetPass-reducer';
import {appReducer} from "./app-reducer";
import {cardsReducer} from "./cards-reducer";
import { cardReducer } from './card-reducer';


const rootReducer = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    restorePassword: restorePasswordReducer,
    resetPassword: resetPasswordReducer,
    cards: cardsReducer,
    card: cardReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
