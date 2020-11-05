import React from 'react';
import { useDispatch } from 'react-redux';

type FilterBtnPropstype = {
	filterUp: string,
	filterDown: string,
	packId?: string
}

const FilterBtn = (props: FilterBtnPropstype) => {

	const dispatch = useDispatch();

	const onUpClick = () => {

	}
	const onDownClick = () => {
		
	}

	return (
		<span>↑</span>
	)
}

export default FilterBtn;