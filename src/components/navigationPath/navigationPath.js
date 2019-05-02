import React from "react";
import {Link} from "gatsby"
import styles from "./navigationPath.module.scss"

const NavigationPath = ({navigationItems}) => {

    return <div className={styles.navigationPathContainer}>
        {navigationItems.map((item, id) =>
            <div key={id} className={styles.navigationItem}>
                <Link to={item.path} className={styles.navigationText}>{item.title}</Link>
            </div>
        )
        }
    </div>
};

export default NavigationPath;