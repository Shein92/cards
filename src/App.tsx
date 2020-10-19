import React from 'react';
import { HashRouter } from 'react-router-dom';
	import './App.css';
import Main from './ui/Main/Main';
import {useDispatch} from "react-redux";
import {authMeTC} from "./bll/profile-reducer";

const App = () => {
	return (
		<div className="App">
			{/* hashRouter, provider */}
			<HashRouter>
				<Main/>
			</HashRouter>
		</div>
	);
}


//{/* <Header/> */}

export default App;
