import React from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC } from '../../../bll/cards-reducer';

type FilterBtnPropstype = {
	filterUp: string,
	filterDown: string,
	packId?: string,
	isArrowDown: boolean,
	setIsArrowDown: (value: boolean) => void,
	packName?: string, 
	min?: number, 
	max?: number, 
	page?: number,
	pageCount?: number, 
	userId?: string
}

const FilterBtn = (props: FilterBtnPropstype) => {

	const dispatch = useDispatch();

	const onUpClick = () => {
		if(getCardsTC()) {
			dispatch(getCardsTC(props.packName, props.min, props.max, props.filterUp, props.page, props.pageCount));
			props.setIsArrowDown(false);
		}
	}
	const onDownClick = () => {
		if(getCardsTC()) {
			dispatch(getCardsTC(props.packName, props.min, props.max, props.filterDown, props.page, props.pageCount));
			props.setIsArrowDown(true)
		}
	}

	return (
	<>{props.isArrowDown ? <span style={{cursor: 'pointer'}} onClick={onUpClick}> ↓ </span>: <span style={{cursor: 'pointer'}} onClick={onDownClick}> ↑</span>}</>
	)
}

export default FilterBtn;