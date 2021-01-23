import React from "react"
import styles from "./header.module.scss"
import {Link} from "gatsby"
import logo from "../../../static/assets/logo/GG.png"
import {SocialIcon} from 'react-social-icons';

const Header = () => (
    <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
            <Link className={styles.logoWrapper} to='/'>
                <span className={styles.imageContainer}>
                    <img src={logo} alt="Logo" width={140}/>
                </span>
                <div className={styles.logoName}>
                    <span className={styles.light}>Gwenaël</span>
                    <span>Girod</span>
                </div>
            </Link>
        </div>

        <div className={styles.menuContainer}>
            <div className={styles.menuWrapper}>
                <span className={styles.menuSocialIcons}>
                     <a className={styles.customIconContainer} href="https://www.senscritique.com/HDogson"
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className={styles.wrapper}>
                            <img className={styles.icon} src={"/assets/logo/SensCritique.png"} alt="Malt"/>
                        </div>
                      </a>
                    <SocialIcon target="_blank" rel="noopener noreferrer"
                                url="https://github.com/Dogson"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "30px", height: "30px"}}/>
                    <SocialIcon target="_blank" rel="noopener noreferrer"
                                url="https://soundcloud.com/gwena-l-dogson"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "30px", height: "30px"}}/>
                    <SocialIcon target="_blank" rel="noopener noreferrer"
                                url="https://www.linkedin.com/in/ggirod/"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "30px", height: "30px"}}/>
                    <SocialIcon target="_blank" rel="noopener noreferrer"
                                url="https://gwenaelgirod.com/rss.xml"
                                network="rss"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "30px", height: "30px"}}/>


                </span>
                <div className={styles.menuNav}>
                    <MenuLink route="/" name="Accueil"/>
                    <MenuLink route="/blog/" name="Blog"/>
                    <MenuLink route="/pro/" name="Profil pro"/>
                    {/*<MenuLink route="/contact/" name="Contact"/>*/}
                </div>
            </div>
        </div>
    </div>
);

const MenuLink = (props) => {
    const {route, name} = props;
    return <Link to={route} className={styles.menuLink} activeClassName={styles.menuLinkActive}
                 partiallyActive={route !== "/"}>
        {name}
    </Link>
};

export default Header