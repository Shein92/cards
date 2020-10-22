import axios from 'axios';


const settings = {
    withCredentials: true
}

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	...settings
});

export const resetPassAPI = {
	resetPass(email: string) {
		// debugger;
		return instance.post('auth/forgot', {
			email: email,
			from: "Almashiy <almashij92@gmail.com>",
			message: `<div style="background-color: lime; padding: 15px">
            	password recovery link: 
            	<a href='http://localhost:3000/cards#/restorePassword/$token$'>
            	link</a></div>`
		})
	},
}