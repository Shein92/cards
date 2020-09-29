import React from 'react';
import style from './PageNotFound.module.css';

const PageNotFound = () => {
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
}

export default PageNotFound;