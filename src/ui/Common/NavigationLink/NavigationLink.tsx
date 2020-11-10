import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationLinkPropsType = {
	to: string,
	title: string
}

const NavigationLink = React.memo((props: NavigationLinkPropsType) => {
	return (
		<div>
			<NavLink to={props.to}>{props.title}</NavLink>
		</div>
	)
})

export default NavigationLink;
