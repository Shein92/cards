import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
	import './App.css';
import { AppRootStateType } from './bll/store';
import { Loading } from './ui/Common/Loading/Loading';
import Main from './ui/Main/Main';

const App = () => {
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
	return (
		<div className="App">
			{isLoading && <Loading />}
			{/* hashRouter, provider */}
			<HashRouter>
				<Main/>
			</HashRouter>
		</div>
	);
}


//{/* <Header/> */}

export default App;
