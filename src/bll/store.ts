import { restorePasswordReducer } from './restorePas-reducer';
import { registrationReducer } from './registration-reducer';
import { profileReducer } from './profile-reducer';
import { newPasswordReducer } from './newPass-reducer';
import { loginReducer } from './login-reducer';
import { combineReducers, createStore } from "redux";


const rootReducer = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    restorePassword: restorePasswordReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>