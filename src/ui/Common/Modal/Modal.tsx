import React from "react";
import styles from "./Module.module.css"

export const Modal = React.memo(({modalActive, setModalActive, children}: ModalPropsType) => {
    return (
        <div className={modalActive ? `${styles.wrapper} ${styles.active}` : styles.wrapper}
             onClick={() => setModalActive(false)}>
            <div className={modalActive ? `${styles.content} ${styles.active}` : styles.content}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
})


// types

type ModalPropsType = {
    modalActive: boolean,
    setModalActive: (value: boolean) => void
    children: React.ReactNode
}
