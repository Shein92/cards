import axios from 'axios';


const settings = {
    withCredentials: true
}

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	...settings
});

export const restorePassAPI = {
	restorePass(password: string, token: string) {
		// debugger;
		return instance.post('auth/set-new-password', {
            password: password,
            resetPasswordToken: token
		})
	},
}