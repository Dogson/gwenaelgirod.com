import React from "react"
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import styles from "./pageLayout.module.scss";
import Sidebar from "react-sidebar";
import {Link} from "gatsby";
import {FaBars, FaHamburger} from "react-icons/fa";

export default ({children}) => (
    <div className={styles.pageContainer}>
        <DrawerNav/>
        <Header/>
        {children}
        <Footer/>
    </div>
)


class DrawerNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    render() {
        return <div className={styles.sidebarContainer}>
            <Sidebar
                sidebar={<MenuNavMobile/>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{sidebar: {background: "white", zIndex: 30}}}
            >
                <div className={styles.sidebarButton} onClick={() => this.onSetSidebarOpen(true)}>
                   <FaBars className={styles.icon}/>
                </div>
            </Sidebar>
        </div>
    }
}

const MenuNavMobile = () => {
    return <div className={styles.menuNavMobile}>
        <MenuMobileLink route="/" name="Accueil"/>
        <MenuMobileLink route="/blog/" name="Blog"/>
        <MenuMobileLink route="/pro/" name="Profil pro"/>
    </div>
}

const MenuMobileLink = (props) => {
    const {route, name} = props;
    return <Link to={route} className={styles.menuMobileLink} activeClassName={styles.menuMobileLinkActive}
                 partiallyActive={route !== "/"}>
        {name}
    </Link>
};