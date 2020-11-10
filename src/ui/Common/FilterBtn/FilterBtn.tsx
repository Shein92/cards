import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC } from '../../../bll/packs-reducer';

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

const FilterBtn = React.memo((props: FilterBtnPropstype) => {

	const dispatch = useDispatch();

	const onUpClick = useCallback(() => {
		if (getCardsTC()) {
			dispatch(getCardsTC(props.packName, props.min, props.max, props.filterUp, props.page, props.pageCount));
			props.setIsArrowDown(false);
		}
	},[dispatch, props]);

	const onDownClick = useCallback(() => {
		if (getCardsTC()) {
			dispatch(getCardsTC(props.packName, props.min, props.max, props.filterDown, props.page, props.pageCount));
			props.setIsArrowDown(true)
		}
	},[dispatch, props])

	return (
		<>{props.isArrowDown ? <span style={{ cursor: 'pointer' }} onClick={onUpClick}> ↓ </span> : <span style={{ cursor: 'pointer' }} onClick={onDownClick}> ↑</span>}</>
	)
})

export default FilterBtn;
