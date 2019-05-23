import {Helmet} from "react-helmet";
import {Link} from "gatsby";
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout";
import React from "react";
import styles from "./404.module.scss";

const PageNotFound = () => (
    <PageLayout>
        <Helmet>
            <meta charSet="utf-8"/>
            <title>GG - Gwenaël GIROD</title>
        </Helmet>
        <SectionLayout>
            <div className={styles.pageNotFoundContainer}>
                <img className={styles.image} src={"assets/logo/radioactive.png"} alt="404" height="200"/>
                <div className={styles.title}>Erreur <strong>404</strong></div>
                <div className={styles.description}>La page demandée n'existe pas.</div>
                <Link to={'/'} className={styles.btnSecondary}>(Faites demi-tour.)</Link>
            </div>
        </SectionLayout>
    </PageLayout>
);

export default PageNotFound;