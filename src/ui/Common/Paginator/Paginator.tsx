import React, {useState} from "react";
import styles from './Paginator.module.css'

export const Paginator = ({totalItemsCount, pageSize, currentPage, portionsSize, onChangePage, onChangeCountOnPage}: PaginatorPropsType) => {
    const [portionNumber, setPortionNumber] = useState(1)
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }
    const lastPage = pages[pages.length - 1]
    const portionsCount = Math.ceil(pagesCount / portionsSize)

    const leftPortionPageNumber = (portionNumber - 1) * portionsSize + 1
    const rightPortionPageNumber = portionNumber * portionsSize

    return (
        <div className="row">
            <div className={"col s6"}>
                <div className={styles.div}>
                    <ul className="pagination">
                        {portionNumber > 1 &&
                        <li onClick={() => setPortionNumber(portionNumber - 1)} className="disabled"><i
                            className="material-icons">chevron_left</i></li>}
                        {pages
                            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                            .map(p => {
                                return <li onClick={() => onChangePage(p)} key={p}
                                           className={currentPage === p ? "active" : "waves-effect"}>{p}</li>
                            })
                        }
                        {portionsCount > portionNumber &&
                        <li onClick={() => setPortionNumber(portionNumber + 1)} className="waves-effect"><i
                            className="material-icons">chevron_right</i></li>}
                    </ul>
                </div>
            </div>

            <div className={"col s1"}>
                <div className={styles.select}>
                    <select className="browser-default" onChange={e => onChangeCountOnPage(+e.target.value)}>
                        <option value="10" selected={pagesCount === +10}>10</option>
                        <option value="20" selected={pagesCount === +20}>20</option>
                        <option value="30" selected={pagesCount === +30}>30</option>
                        <option value="40" selected={pagesCount === +40}>40</option>
                        <option value="50" selected={pagesCount === +50}>50</option>
                    </select>
                </div>

            </div>
        </div>

    )
}

// types

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionsSize: number
    onChangePage: (currentPage: number) => void
    onChangeCountOnPage: (count: number) => void
}
