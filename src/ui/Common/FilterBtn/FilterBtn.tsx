import React from 'react';
import { useDispatch } from 'react-redux';

type FilterBtnPropstype = {
	filterUp: string,
	filterDown: string,
	packId?: string
}

const FilterBtn = (props: FilterBtnPropstype) => {

	const dispatch = useDispatch();

	const onClick = () => {
		
	}

	return (
		<span>↑</span>
	)
}

export default FilterBtn;