import React from "react"
import styles from "./noPosts.module.scss"

const NoPosts = () => {
    return <div className={styles.noPostsContainer}>
        <p>Il n'y a aucun posts dans cette catégorie.</p>
        <span className={styles.small}>Je m'y mets quand je finis ma bière.</span>
    </div>
};

export default NoPosts;