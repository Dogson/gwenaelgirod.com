import React from "react"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"
import TrackVisibility from 'react-on-screen';
import {FaEnvelope, FaGithub, FaGlobeAfrica, FaLinkedin, FaReact} from 'react-icons/fa';
import styles from "./pro.module.scss"
import cx from "classnames";
import {SkillsCard} from "../components/SkillsCard/skillsCard";
import {Helmet} from "react-helmet";


class ProfessionalProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: true
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize() {
        let mobile = (window.innerWidth <= 600);
        if (mobile !== this.state.mobile) {
            this.setState({mobile});
        }
    }


    render() {
        const navigationItems = [
            {
                title: "Accueil",
                path: '/'
            },
            {
                title: "Profil professionnel",
                path: '/pro/'
            }
        ];
        return <PageLayout>
            <Helmet>
                <title>Gwenaël GIROD - Développeur web</title>
            </Helmet>
            <div className={styles.descriptionHeader}>
                <div className={styles.descriptionSectionTitle}>
                    <span>Mon profil professionnel</span>
                </div>
                <img className={styles.descriptionBackgroundImage} src={"/assets/images/moi-cover.jpg"}
                     alt="Je suis un paysage Casamançais" height="100%"
                     width="100%"/>
            </div>
            <SectionLayout noPaddingTop navigationPath={navigationItems}>
                <TrackVisibility once partialVisibility={true}>
                    <DescriptionContainer mobile={this.state.mobile}/>
                </TrackVisibility>
            </SectionLayout>

            <SectionLayout odd title="Compétences">
                <div className={styles.skillsContainer}>
                    <div className="wrapper">
                        <SkillsBody mobile={this.state.mobile}/>
                    </div>
                </div>
            </SectionLayout>

            <SectionLayout title="Contact">
                <div className={styles.skillsContainer}>
                    <div className="wrapper">
                        <TrackVisibility partialVisibility once>
                            <ContactBody mobile={this.state.mobile}/>
                        </TrackVisibility>
                    </div>
                </div>
            </SectionLayout>
        </PageLayout>
    }
}

const DescriptionContainer = ({isVisible, mobile}) => {
    let classNames = cx(styles.descriptionContainer, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <div className={styles.descriptionWrapper}>
            <TrackVisibility once partialVisibility={true}>
                <DescriptionLeftPanel mobile={mobile}/>
            </TrackVisibility>
            <div style={{zIndex: 3, backgroundColor: 'white'}}>
                <TrackVisibility once partialVisibility={true}>
                    <DescriptionBody mobile={mobile}/>
                </TrackVisibility>
            </div>
        </div>
    </div>
};

const DescriptionLeftPanel = ({isVisible, mobile}) => {
    let classNames = cx(styles.descriptionLeftPanel, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <div className={styles.title}>
            Présentation
        </div>
        <img className={styles.image} src={"/assets/images/moi.jpg"} alt="S'hydrater, c'est important !"
             height="100%" width="100%"/>
    </div>
};


const DescriptionBody = ({isVisible, mobile}) => {
    let classNames = cx(styles.bodyWrapper, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <div className={styles.body}>
            <DescriptionSection1/>
            <DescriptionSection2/>
        </div>
    </div>
};

const DescriptionSection1 = () => {
    let classNames = cx(styles.bodySection, styles.bodySection1);
    return <div className={classNames}>
        <div>
            <FaReact className={styles.descriptionIcon}/>
        </div>
        <div>
            <p>
                Je suis un développeur <strong>web</strong> et <strong>mobile</strong> spécialisé dans les
                technologies <strong>Javascript</strong>
                , en particulier ReactJS
                & React Native.
            </p>
            <p>
                Depuis 3 ans, je m'aventure dans l'écosystème <strong>front-end</strong> Javascript
                afin de découvrir et maîtriser de
                nouvelles façons de <strong>concevoir</strong> et <strong>développer</strong> des applications web et
                mobiles modernes.
            </p>
        </div>
        <div className={styles.transparent}>
            <FaReact className={styles.descriptionIcon}/>
        </div>
    </div>;
};

const DescriptionSection2 = () => {
    let classNames = cx(styles.bodySection, styles.bodySection2);
    return <div className={classNames}>
        <div className={styles.transparent}><FaGlobeAfrica className={styles.descriptionIcon}/></div>
        <div><p>
            <strong>Aventurier</strong> en informatique, mais pas seulement. Passioné de voyage depuis
            toujours, je
            suis actuellement en résidence à <strong>Dakar, Sénégal</strong>.

        </p>
            <p>
                Etant résolument <strong>autonome</strong> et très <strong>organisé</strong>, je suis à même d'évoluer
                sur des projets <strong>à distance</strong>, tout en
                restant <strong>virtuellement disponible</strong> à 100% pour participer activement aux
                processus de <strong>gestion de projet</strong> qui
                vous conviennent. </p>
        </div>
        <div><FaGlobeAfrica className={styles.descriptionIcon}/></div>
    </div>;
};

const SkillsBody = ({mobile}) => {
    return <div className={styles.body}>
        <TrackVisibility once partialVisibility={true}>
            <SkillsSection1 mobile={mobile}/>
        </TrackVisibility>
        <TrackVisibility once partialVisibility={true}>
            <SkillsSection2 mobile={mobile}/>
        </TrackVisibility>
        <TrackVisibility once partialVisibility={true}>
            <SkillsSection3 mobile={mobile}/>
        </TrackVisibility>
    </div>
};

const SkillsSection1 = ({isVisible, mobile}) => {
    let classNames = cx(styles.bodySection, styles.bodySection1, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <SkillsCard title="javascript"
                    skills={["ReactJS + Redux", "React Native", "AngularJS", "NodeJS + Express", "TypeScript"]}/>
    </div>;
};

const SkillsSection2 = ({isVisible, mobile}) => {
    let classNames = cx(styles.bodySection, styles.bodySection2, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <SkillsCard title="web"
                    skills={["HTML 5 + SASS/LESS", "Firebase", "GraphQL", "MongoDB", "JAMstack"]}/>
    </div>;
};

const SkillsSection3 = ({isVisible, mobile}) => {
    let classNames = cx(styles.bodySection, styles.bodySection3, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <SkillsCard title="outils"
                    skills={["Git (& SVN)", "NPM", "Webpack", "Grunt", "Gatsby + CMS"]}/>
    </div>;
};


const ContactBody = ({isVisible, mobile}) => {
    let classNames = cx(styles.mainContactContainer, {[styles.visible]: isVisible || mobile});
    return <div className={classNames}>
        <div className={styles.subtitle}>
            <span>Une suggestion ?</span> <span>Un projet ? </span>
            <span style={{display: "block"}}><strong>Retrouvez-moi sur les plateformes suivantes :</strong></span>
        </div>
        <div className={styles.contactContainer}>
            <a className={styles.contactIconContainer} href="https://www.linkedin.com/in/ggirod/" target="_blank"
               rel="noopener noreferrer">
                <div className={styles.wrapper}>
                    <FaLinkedin className={styles.contactIcon}/>
                </div>
                <div className={styles.description}>LINKEDIN</div>
            </a>

            <a className={styles.contactIconContainer} href="https://github.com/Dogson/" target="_blank"
               rel="noopener noreferrer">
                <div className={styles.wrapper}>
                    <FaGithub className={styles.contactIcon}/>
                </div>
                <div className={styles.description}>GITHUB</div>
            </a>

            <a className={styles.contactIconContainer} href="https://www.malt.fr/profile/gwenaelgirod" target="_blank"
               rel="noopener noreferrer">
                <div className={styles.wrapper}>
                    <img className={styles.contactIcon} src={"/assets/logo/malt.png"} alt="Malt"/>
                </div>
                <div className={styles.description}>MALT</div>
            </a>

            <a className={styles.contactIconContainer} href="mailto:gwenael.girod@gmail.com?subject=[Professionnel]"
               target="_blank"
               rel="noopener noreferrer">
                <div className={styles.wrapper}>
                    <FaEnvelope className={styles.contactIcon}/>
                </div>
                <div className={styles.description}>COURRIEL</div>
            </a>
        </div>
    </div>
};


export default ProfessionalProfile;