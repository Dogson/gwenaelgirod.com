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
                    <SocialIcon target="_blank" rel="noopener noreferrer" url="https://facebook.com"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "25px", height: "25px"}}/>
                    <SocialIcon target="_blank" rel="noopener noreferrer" url="https://twitter.com"
                                className={styles.socialIcon} bgColor="white" fgColor="transparent"
                                style={{width: "25px", height: "25px"}}/>
                </span>
                <div className={styles.menuNav}>
                    <MenuLink route="/" name="Accueil"/>
                    <MenuLink route="/formations/" name="Étudiants"/>
                    <MenuLink route="/etablissements/" name="Établissements"/>
                    <MenuLink route="/entreprises/" name="Entreprises"/>
                </div>
            </div>
        </div>
    </div>
);

const MenuLink = (props) => {
    const {route, name} = props;
    return <Link to={route} className={styles.menuLink} activeClassName={styles.menuLinkActive}>
        {name}
    </Link>
};

export default Header