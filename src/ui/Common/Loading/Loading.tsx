import React from "react";
import styles from "./Loading.module.css"

export const Loading = () => {
    return (
        <div className={styles.loaderWrap}>
            <div className={styles.loader}>
                <img src={require('./img/Spinner.svg')} alt="spinner loading"/>
            </div>
        </div>
    )
}
