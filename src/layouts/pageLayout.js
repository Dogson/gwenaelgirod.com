import React from "react"
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import styles from "./pageLayout.module.scss";

export default ({ children }) => (
    <div className={styles.pageContainer}>
        <Header/>
        {children}
        <Footer/>
    </div>
)