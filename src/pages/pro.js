import React from "react"
import PageLayout from "../layouts/pageLayout"
import SectionLayout from "../layouts/sectionLayout"
import TrackVisibility from "react-on-screen"
import {
  FaEnvelope,
  FaGithub,
  FaDolly,
  FaPalette,
  FaLinkedin,
  FaReact,
} from "react-icons/fa"
import styles from "./pro.module.scss"
import cx from "classnames"
import { SkillsCard } from "../components/SkillsCard/skillsCard"
import { Helmet } from "react-helmet"

class ProfessionalProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: false,
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this))
  }

  resize() {
    let mobile = window.innerWidth <= 600
    if (mobile !== this.state.mobile) {
      this.setState({ mobile })
    }
  }

  render() {
    const navigationItems = [
      {
        title: "Accueil",
        path: "/",
      },
      {
        title: "Profil professionnel",
        path: "/pro/",
      },
    ]
    return (
      <PageLayout>
        <Helmet>
          <title>Gwenaël GIROD - Développeur web</title>
        </Helmet>
        <div className={styles.descriptionHeader}>
          <div className={styles.descriptionSectionTitle}>
            <span>Mon profil professionnel</span>
          </div>
          <img
            className={styles.descriptionBackgroundImage}
            src={"/assets/images/moi-cover.jpg"}
            alt="Je suis un paysage Casamançais"
            height="100%"
            width="100%"
          />
        </div>
        <SectionLayout noPaddingTop navigationPath={navigationItems}>
          <TrackVisibility once partialVisibility={true}>
            <DescriptionContainer mobile={this.state.mobile} />
          </TrackVisibility>
        </SectionLayout>

        <SectionLayout odd title="Compétences">
          <div className={styles.skillsContainer}>
            <div className="wrapper">
              <SkillsBody mobile={this.state.mobile} />
            </div>
          </div>
        </SectionLayout>

        <SectionLayout title="Contact">
          <div className={styles.skillsContainer}>
            <div className="wrapper">
              <TrackVisibility partialVisibility once>
                <ContactBody mobile={this.state.mobile} />
              </TrackVisibility>
            </div>
          </div>
        </SectionLayout>
      </PageLayout>
    )
  }
}

const DescriptionContainer = ({ isVisible, mobile }) => {
  let classNames = cx(styles.descriptionContainer, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <div className={styles.descriptionWrapper}>
        <TrackVisibility once partialVisibility={true}>
          <DescriptionLeftPanel mobile={mobile} />
        </TrackVisibility>
        <div style={{ zIndex: 3, backgroundColor: "white" }}>
          <TrackVisibility once partialVisibility={true}>
            <DescriptionBody mobile={mobile} />
          </TrackVisibility>
        </div>
      </div>
    </div>
  )
}

const DescriptionLeftPanel = ({ isVisible, mobile }) => {
  let classNames = cx(styles.descriptionLeftPanel, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <div>
        <div className={styles.title}>Présentation</div>
        <img
          className={styles.image}
          src={"/assets/images/moi.jpg"}
          alt="Photo de Gwenaël"
        />
      </div>

      {!mobile && (
        <div>
          <img
            src={"/assets/images/djedm.png"}
            alt="Des jeux et des mots"
            width="100%"
          />
          <img
            src={"/assets/images/flowstate.png"}
            alt="Flow State"
            width="100%"
          />
        </div>
      )}
    </div>
  )
}

const DescriptionBody = ({ isVisible, mobile }) => {
  let classNames = cx(styles.bodyWrapper, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <div className={styles.body}>
        <DescriptionSection1 />
        <DescriptionSection2 />
        <DescriptionSection3 />
        {mobile && (
          <div>
            <img
              src={"/assets/images/djedm.png"}
              alt="Des jeux et des mots"
              width="100%"
            />
            <img
              src={"/assets/images/flowstate.png"}
              alt="Flow State"
              width="100%"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const DescriptionSection1 = () => {
  let classNames = cx(styles.bodySection, styles.bodySection1)
  return (
    <div className={classNames}>
      <div>
        <FaReact className={styles.descriptionIcon} />
      </div>
      <div>
        <p>
          Je suis un développeur web <strong>fullstack</strong> passionné par
          les technologies Javascript. Je m’intéresse aux{" "}
          <strong>projets de toute envergure</strong>, qu’il s’agisse de
          vitrines marketing avec CMS en Jamstack ou d’applications web plus
          complexes avec API dédiée.
        </p>
        <p>
          Depuis 6 ans, je m'aventure dans{" "}
          <strong>l'écosystème fullstack Javascript</strong> afin de découvrir
          et maîtriser de nouvelles façons de{" "}
          <strong>construire des applications web modernes</strong>.
        </p>
      </div>
      <div className={styles.transparent}>
        <FaReact className={styles.descriptionIcon} />
      </div>
    </div>
  )
}

const DescriptionSection2 = () => {
  let classNames = cx(styles.bodySection, styles.bodySection2)
  return (
    <div className={classNames}>
      <div className={styles.transparent}>
        <FaDolly className={styles.descriptionIcon} />
      </div>
      <div>
        <p>
          Aujourd'hui <strong>freelance</strong> basé à Grenoble, je souhaite
          préserver mon indépendance et continuer à apporter mon
          <strong>expertise technique et métier</strong> en participant
          activement au <strong>développement</strong> mais également à la{" "}
          <strong>conception</strong> de vos produits.
        </p>
        <p>
          Etant résolument <strong>autonome</strong> et très{" "}
          <strong>organisé</strong>, je suis à même d'évoluer sur des projets{" "}
          <strong>chez le client</strong>, mais aussi{" "}
          <strong>à distance</strong> en restant{" "}
          <strong>virtuellement disponible</strong> à 100% pour participer
          activement aux processus de <strong>gestion de projet</strong> qui
          vous conviennent.{" "}
        </p>
      </div>
      <div>
        <FaDolly className={styles.descriptionIcon} />
      </div>
    </div>
  )
}

const DescriptionSection3 = () => {
  let classNames = cx(styles.bodySection, styles.bodySection3)
  return (
    <div className={classNames}>
      <div>
        <FaPalette className={styles.descriptionIcon} />
      </div>
      <div>
        <p>
          En marge des diverses missions d'ingénierie en développement front-end
          que j'ai pu effectuer chez un nombre varié de clients, j'ai également
          pu compléter quelques projets personnels qui me tenaient à coeur :
          <ul>
            <li>
              <strong>
                <a target="_blank" href="https://desjeuxetdesmots.gwen.cool">
                  Des Jeux et des Mots
                </a>
              </strong>{" "}
              - un aggrégateur de podcast et vidéos youtube d'essais de jeux
              vidéo, trié par jeux vidéo. (ReactJS, API REST Node avec NestJS).
            </li>
            <li>
              <strong>
                <a target="_blank" href="https://flowstate.gwen.cool">
                  Flow State
                </a>
              </strong>{" "}
              - des mixes de musique de jeux vidéo, triés par style, enrobé d'un
              habillage visuel et sonore retro et relaxant. (ReactJS)
            </li>
          </ul>
        </p>
      </div>
      <div className={styles.transparent}>
        <FaPalette className={styles.descriptionIcon} />
      </div>
    </div>
  )
}

const SkillsBody = ({ mobile }) => {
  return (
    <div className={styles.body}>
      <TrackVisibility once partialVisibility={true}>
        <SkillsSection1 mobile={mobile} />
      </TrackVisibility>
      <TrackVisibility once partialVisibility={true}>
        <SkillsSection2 mobile={mobile} />
      </TrackVisibility>
      <TrackVisibility once partialVisibility={true}>
        <SkillsSection3 mobile={mobile} />
      </TrackVisibility>
    </div>
  )
}

const SkillsSection1 = ({ isVisible, mobile }) => {
  let classNames = cx(styles.bodySection, styles.bodySection1, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <SkillsCard
        title="javascript"
        skills={[
          "ReactJS + Redux",
          "React Native",
          "AngularJS",
          "NodeJS + Express",
          "TypeScript",
        ]}
      />
    </div>
  )
}

const SkillsSection2 = ({ isVisible, mobile }) => {
  let classNames = cx(styles.bodySection, styles.bodySection2, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <SkillsCard
        title="web"
        skills={[
          "HTML 5 + SASS/LESS",
          "Firebase",
          "GraphQL",
          "MongoDB",
          "JAMstack",
        ]}
      />
    </div>
  )
}

const SkillsSection3 = ({ isVisible, mobile }) => {
  let classNames = cx(styles.bodySection, styles.bodySection3, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <SkillsCard
        title="outils"
        skills={["Git (& SVN)", "NPM", "Webpack", "Grunt", "Gatsby + CMS"]}
      />
    </div>
  )
}

const ContactBody = ({ isVisible, mobile }) => {
  let classNames = cx(styles.mainContactContainer, {
    [styles.visible]: isVisible || mobile,
  })
  return (
    <div className={classNames}>
      <div className={styles.subtitle}>
        <span>Une suggestion ?</span> <span>Un projet ? </span>
        <span style={{ display: "block" }}>
          <strong>Retrouvez-moi sur les plateformes suivantes :</strong>
        </span>
      </div>
      <div className={styles.contactContainer}>
        <a
          className={styles.contactIconContainer}
          href="https://www.linkedin.com/in/ggirod/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.wrapper}>
            <FaLinkedin className={styles.contactIcon} />
          </div>
          <div className={styles.description}>LINKEDIN</div>
        </a>

        <a
          className={styles.contactIconContainer}
          href="https://github.com/Dogson/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.wrapper}>
            <FaGithub className={styles.contactIcon} />
          </div>
          <div className={styles.description}>GITHUB</div>
        </a>

        <a
          className={styles.contactIconContainer}
          href="https://www.malt.fr/profile/gwenaelgirod"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.wrapper}>
            <img
              className={styles.contactIcon}
              src={"/assets/logo/malt.png"}
              alt="Malt"
            />
          </div>
          <div className={styles.description}>MALT</div>
        </a>

        <a
          className={styles.contactIconContainer}
          href="mailto:gwenael.girod@gmail.com?subject=[Professionnel]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.wrapper}>
            <FaEnvelope className={styles.contactIcon} />
          </div>
          <div className={styles.description}>COURRIEL</div>
        </a>
      </div>
    </div>
  )
}

export default ProfessionalProfile
