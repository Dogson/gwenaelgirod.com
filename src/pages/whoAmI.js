import React from "react"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"
import TrackVisibility from 'react-on-screen';
import {FaGlobeAfrica, FaReact} from 'react-icons/fa';
import styles from "./whoAmI.module.scss"
import cx from "classnames";
import {MEDIA_CATEGORIES} from "../helpers/const";
import {SkillsCard} from "../components/SkillsCard/skillsCard";


const WhoAmIPage = () => {
    const navigationItems = [
        {
            title: "Accueil",
            path: '/'
        },
        {
            title: "Qui suis-je ?",
            path: '/whoAmI/'
        }
    ];
    return <PageLayout>
        <div className={styles.descriptionHeader}>
            <div className={styles.descriptionSectionTitle}>
                <span>Qui suis-je ?</span>
            </div>
            <img className={styles.descriptionBackgroundImage} src={"/assets/images/moi-cover.jpg"}
                 alt="Je suis un paysage Casamançais" height="100%"
                 width="100%"/>
        </div>
        <SectionLayout noPaddingTop navigationPath={navigationItems}>
            <TrackVisibility partialVisibility={true}>
                <div className={styles.descriptionContainer}>
                    <TrackVisibility partialVisibility={true}>
                        <DescriptionLeftPanel/>
                    </TrackVisibility>
                    <div style={{zIndex: 3}}>
                        <TrackVisibility partialVisibility={true}>
                            <DescriptionBody/>
                        </TrackVisibility>
                    </div>
                </div>
            </TrackVisibility>
        </SectionLayout>

        <SectionLayout odd title="Compétences">
            <div className={styles.skillsContainer}>
                <div className="wrapper">
                    <SkillsBody/>
                </div>
            </div>
        </SectionLayout>
    </PageLayout>
};

const DescriptionLeftPanel = ({isVisible}) => {
    let classNames = cx(styles.descriptionLeftPanel, {[styles.visible]: isVisible});
    return <div className={classNames}>
        <div className={styles.title}>
            Présentation
        </div>
        <img className={styles.image} src={"/assets/images/moi.jpg"} alt="S'hydrater, c'est important !"
             height="100%" width="100%"/>
    </div>
};


const DescriptionBody = ({isVisible}) => {
    let classNames = cx(styles.bodyWrapper, {[styles.visible]: isVisible});
    return <div className={classNames}>
        <div className={styles.body}>
            <TrackVisibility partialVisibility={true}>
                <DescriptionSection1/>
            </TrackVisibility>
            <TrackVisibility partialVisibility={true}>
                <DescriptionSection2/>
            </TrackVisibility>
        </div>
    </div>
};

const DescriptionSection1 = ({isVisible}) => {
    let classNames = cx(styles.bodySection, styles.bodySection1, {[styles.visible]: isVisible});
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

const DescriptionSection2 = ({isVisible}) => {
    let classNames = cx(styles.bodySection, styles.bodySection2, {[styles.visible]: isVisible});
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

const SkillsBody = () => {
    return <div className={styles.body}>
        <TrackVisibility partialVisibility={true}>
            <SkillsSection1/>
        </TrackVisibility>
        <TrackVisibility partialVisibility={true}>
            <SkillsSection2/>
        </TrackVisibility>
        <TrackVisibility partialVisibility={true}>
            <SkillsSection3/>
        </TrackVisibility>
    </div>
};

const SkillsSection1 = ({isVisible}) => {
    let classNames = cx(styles.bodySection, styles.bodySection1, {[styles.visible]: isVisible});
    return <div className={classNames}>
        <SkillsCard title="javascript"
                    skills={["ReactJS + Redux", "React Native", "AngularJS", "NodeJS + Express", "TypeScript"]}/>
    </div>;
};

const SkillsSection2 = ({isVisible}) => {
    let classNames = cx(styles.bodySection, styles.bodySection2, {[styles.visible]: isVisible});
    return <div className={classNames}>
        <SkillsCard title="web"
                    skills={["Firebase", "HTML 5 + SASS/LESS", "Flexbox", "Responsive", "Bootstrap"]}/>
    </div>;
};

const SkillsSection3 = ({isVisible}) => {
    let classNames = cx(styles.bodySection, styles.bodySection3, {[styles.visible]: isVisible});
    return <div className={classNames}>
        <SkillsCard title="outils"
                    skills={["Git (& SVN)", "NPM", "Babel", "Grunt", "IntelliJ"]}/>
    </div>;
};

export default WhoAmIPage;