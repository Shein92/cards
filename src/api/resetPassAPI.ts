import axios from 'axios';


const settings = {
    withCredentials: true
}

const instance = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	...settings
});

export const resetPassAPI = {
	resetPass(email: string) {
		// debugger;
		return instance.post('auth/forgot', {
			email: email,
			from: "test-front-admin <ai73a@yandex.by>",
			message: `<div style="background-color: lime; padding: 15px">
            	password recovery link: 
            	<a href='https://shein92.github.io/cards/#/restorePassword/$token$'>
            	link</a></div>`
		})
		// <a href='http://localhost:3000/cards#/restorePassword/$token$'>
	},
}
