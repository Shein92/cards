import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import style from './PageNotFound.module.css';

const PageNotFound = React.memo(() => {

	if (<Route exact path={'/'} />) {
		return <Redirect to={'/login'} />
	}

	return (
		<div className={style.pageNotFound}>
			<h2>
				<div>
					<span>PAGE NOT FOUND</span>
				</div>
				<div>
					<span>404 ERROR!</span>
				</div>
			</h2>
		</div>
	)
})

export default PageNotFound;