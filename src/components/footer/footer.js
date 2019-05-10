import React from "react"
import styles from "./footer.module.scss"
import {Link} from "gatsby"
import logo from "../../../static/assets/logo/GG.png"

const Footer = () => (
    <div className={styles.footerContainer}>
        <div className={styles.firstCol}>
            <div className={styles.logoContainer}>
                <Link className={styles.logoWrapper} to='/'>
                <span className={styles.imageContainer}>
                    <img src={logo} alt="Logo" width={80}/>
                </span>
                    <div className={styles.logoName}>
                        <span className={styles.light}>Gwenaël</span>
                        <span>Girod</span>
                    </div>
                </Link>
            </div>
            <div className={styles.copyright}>© Gwenaël Girod, 2019</div>
        </div>

        <div className={styles.menusContainer}>
            <div className={styles.menusWrapper}>
                <div className={styles.menuContainer}>
                    <div className={styles.title}>Me suivre</div>
                    <div className={styles.item}>
                        <a href="https://github.com/Dogson" target="_blank" rel="noopener noreferrer">Github</a>
                    </div>
                    <div className={styles.item}>
                        <a href="https://www.senscritique.com/HDogson" target="_blank" rel="noopener noreferrer">SensCritique</a>
                    </div>
                    <div className={styles.item}>
                        <a href="https://soundcloud.com/gwena-l-dogson" target="_blank" rel="noopener noreferrer">Soundcloud</a>
                    </div>
                    <div className={styles.item}>
                        <a href="https://www.linkedin.com/in/ggirod/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div className={styles.menuContainer}>
                    <div className={styles.title}>Contact</div>
                    <div className={styles.item}>
                        <a href="mailto:gwenael.girod@gmail.com?subject=[gwenaelgirod.com]" target="_blank" rel="noopener noreferrer">Remarque ou suggestion</a>
                    </div>
                    <div className={styles.item}>
                        <a href="mailto:gwenael.girod@gmail.com?subject=[Professionnel]" target="_blank" rel="noopener noreferrer">Proposer un projet web/mobile</a>
                    </div>
                </div>

                <div className={styles.menuContainer}>
                    <div className={styles.title}>Aide</div>
                    <div className={styles.item}>
                        <Link to={'/plan-du-site/'}>Plan du site</Link>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

export default Footer