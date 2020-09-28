import React from 'react';
import { HashRouter } from 'react-router-dom';
	import './App.css';
import Main from './ui/Main/Main';

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
