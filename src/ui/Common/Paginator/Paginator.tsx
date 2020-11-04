import React, {useState} from "react";

export const Paginator = ({totalItemsCount, pageSize, currentPage, portionsSize, onChangePage}: PaginatorPropsType) => {
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
        <div>
            <ul className="pagination">
                {portionNumber > 1 &&
                <li onClick={() => setPortionNumber(portionNumber - 1)} className="disabled"><i
                    className="material-icons">chevron_left</i></li>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <li onClick={() => onChangePage(p)} key={p} className={currentPage === p ? "active" : "waves-effect"}>{p}</li>
                    })
                }
                {portionsCount > portionNumber &&
                <li onClick={() => setPortionNumber(portionNumber + 1)} className="waves-effect"><i className="material-icons">chevron_right</i></li>}
            </ul>
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
}
