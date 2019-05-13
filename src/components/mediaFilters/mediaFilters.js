import React from "react"
import styles from "./mediaFilters.module.scss"
import cx from "classnames";
import {Link} from "gatsby"
import {MEDIA_CATEGORIES} from "../../helpers/const";

const MediaFilters = () => {
    return <div className={styles.mediaFiltersContainer}>
        <div className={styles.mediaFiltersHeader}>
            <div className={styles.title}>Explorer les billets par catégorie :</div>
            <Link className={styles.seeAllBtn} activeClassName={styles.seeAllBtnActive} to={"/blog/"}>Voir tous les
                billets</Link>
        </div>
        <div className={styles.mediaFilters}>
            {Object.keys(MEDIA_CATEGORIES).map((key, index) => {
                    const details = MEDIA_CATEGORIES[key];
                    const classNames = cx(styles.mediaFilter, styles[key]);
                    if (key === "all") {
                        return null;
                    }
                    return <div key={index}>
                        <Link className={classNames} activeClassName={styles.mediaFilterActive}
                              to={details.path}>
                            <span className={styles.icon}>{details.icon}</span>
                            <span className={styles.name}>{details.name}</span>
                        </Link>
                    </div>
                }
            )}
        </div>
    </div>
};

export default MediaFilters;