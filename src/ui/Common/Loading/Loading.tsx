import React from "react";
import styles from "./Loading.module.css"

export const Loading = React.memo(() => {
    return (
        <div className={styles.load}>
            <div className={styles.loaderWrapper}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
// export const Loading = () => {
//     return (
//         <div className={styles.loaderWrap}>
//             <div className={styles.loader}>
//                 <img src={require('./img/Spinner.svg')} alt="spinner loading"/>
//             </div>
//         </div>
//     )
// }
