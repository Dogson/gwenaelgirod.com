import React from "react"
import {Link} from 'gatsby'
import cx from 'classnames';
import styles from "./sectionLayout.module.scss"

export default ({children, title, action, odd, withBorders, noPaddingTop}) => {

    const classes = cx(styles.sectionContainer, {[styles.secondaryBackground]: odd}, {[styles.withBorders]: withBorders}, {[styles.noPaddingTop]: noPaddingTop});
    const titleClass = cx({[styles.sectionTitle]: title});

    function SectionButton() {
        if (action) {
            return <Link className={styles.btnSecondary} to={action.path}>{action.title}</Link>
        }
        return null;
    }

    return <div className={classes}>
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={titleClass}>
                    <span>{title}</span>
                </div>
                <div>
                    <SectionButton/>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>

}