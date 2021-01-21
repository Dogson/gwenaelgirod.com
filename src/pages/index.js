import React from "react"
import {graphql, Link, withPrefix} from "gatsby"
import cx from 'classnames';
import {FaCode} from "react-icons/fa";
import Post from "../components/newsPost/post"
import Carousel from "../components/carousel/carousel";
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"

import styles from "./index.module.scss";
import {MEDIA_CATEGORIES} from "../helpers/const";
import {Helmet} from "react-helmet";


/**
 * PAGE D'ACCUEIL DU SITE
 */
/**
 * @param {{edges:array}} news
 */
const IndexPage = ({data: {posts}}) => {
    return <PageLayout>
        <Helmet>
            <meta charSet="utf-8" />
            <title>GG - Gwenaël GIROD</title>
        </Helmet>
        <div className={styles.carouselContainer}><HomeCarousel posts={posts.edges.slice(0, 5)}/></div>
        <DescriptionSection/>
        <BlogSection posts={posts.edges}/>
    </PageLayout>
};

export default IndexPage

const HomeCarousel = ({posts}) => {

    const items = posts.map((item) => {
        return {
            image: item.node.frontmatter.image ? withPrefix(item.node.frontmatter.image) : withPrefix(MEDIA_CATEGORIES[item.node.frontmatter.category].image),
            title: item.node.frontmatter.title,
            path: item.node.fileAbsolutePath,
            category: item.node.frontmatter.category
        };
    });
    return <Carousel items={items}/>
};


/**
 * SECTION 1 : DESCRIPTION DU CFS + ENCART "ACCES"
 */
class DescriptionSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subj: true
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                subj: !this.state.subj
            })
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderSubjObj() {
        const classnames = cx([styles.subjObj, {[styles.margin]: this.state.subj}]);

        return <span>
            <div className={classnames}>
                 <div className={styles.obj}><strong>objective</strong></div>
                <div className={styles.subj}><strong>subjective</strong></div>
            </div>
        </span>
    }

    render() {
        const btnClassNames = {
            gaming: cx(styles.btnPrimary, styles.gaming),
            movies: cx(styles.btnPrimary, styles.movies),
            tv: cx(styles.btnPrimary, styles.tv),
            music: cx(styles.btnPrimary, styles.music),
            books: cx(styles.btnPrimary, styles.books),
        };

        return <SectionLayout odd>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTextContainer}>
                    <div className={styles.titleContainer}>
                        <span>Du <strong>blogging</strong> culturel positif</span>
                    </div>
                    <div className={styles.body}>
                        <p>Voici mon site personnel de blogging, où l'on parlera médias culturels, dans un environnement positif.
                            Etant de nature optimiste, je mettrais plus en avant les œuvres qui m'ont marqué, hier et aujourd'hui,
                            celles que j'affectionne dans les univers de jeux vidéo, cinéma, télévision, musique et littérature.</p>
                        <span> Et ce, bien sûr, de manière totalement {this.renderSubjObj()}</span>
                        <p>L'idée est avant tout de développer mon esprit d'analyse et compétences de rédaction.
                            Et si quelqu'un peut prendre du plaisir à me lire, c'est tout benef'.</p>
                        <p>Je suis également développeur web et mobile, spécialisé dans les technologies javascript
                            front-end (ReactJS & Native).</p>
                        <p> À bon entendeur.</p>
                    </div>
                </div>
                <div className={styles.navigationPanelContainer}>
                    <div className={styles.titleContainer}><span>Accès</span></div>
                    <div className={styles.navigationPanel}>
                        <div className={styles.title}>
                            Mes billets par <strong>média</strong> :
                        </div>
                        <Link className={btnClassNames.gaming} to={MEDIA_CATEGORIES["gaming"].path}>
                            <span
                                className={styles.icon}>{MEDIA_CATEGORIES["gaming"].icon}</span>{MEDIA_CATEGORIES["gaming"].name}
                        </Link>
                        <Link className={btnClassNames.movies} to={MEDIA_CATEGORIES["movies"].path}>
                            <span
                                className={styles.icon}>{MEDIA_CATEGORIES["movies"].icon}</span>{MEDIA_CATEGORIES["movies"].name}
                        </Link>
                        <Link className={btnClassNames.tv} to={MEDIA_CATEGORIES["tv"].path}>
                            <span
                                className={styles.icon}>{MEDIA_CATEGORIES["tv"].icon}</span>{MEDIA_CATEGORIES["tv"].name}
                        </Link>
                        <Link className={btnClassNames.music} to={MEDIA_CATEGORIES["music"].path}>
                            <span
                                className={styles.icon}>{MEDIA_CATEGORIES["music"].icon}</span>{MEDIA_CATEGORIES["music"].name}
                        </Link>
                        <Link className={btnClassNames.books} to={MEDIA_CATEGORIES["books"].path}>
                            <span
                                className={styles.icon}>{MEDIA_CATEGORIES["books"].icon}</span>{MEDIA_CATEGORIES["books"].name}
                        </Link>

                        <div className={styles.title} style={{marginTop: '20px'}}>
                            Vous cherchez un <strong>développeur web</strong> ?
                        </div>
                        <Link className={styles.btnPrimary} to={"/pro/"}><span
                            className={styles.icon}><FaCode/></span>Mon profil pro</Link>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </SectionLayout>
    }
}


/**
 * SECTION 2: ARTICLES
 */
const BlogSection = ({posts}) => {
    const Posts = posts
        .map((post) => <Post key={post.node.id} post={post.node}/>);

    const action = {
        title: "Voir tous les billets",
        path: '/blog/'
    };

    return <SectionLayout title="Billets" action={action}>
        <div className={styles.postsContainer}>
            {Posts}
        </div>
    </SectionLayout>
};

export const pageQuery = graphql`
  query {
      posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "post"}}}, limit: 6) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              fileAbsolutePath
              frontmatter {
                date
                title
                summary
                image
                category
              }
            }
          }
      }
    }
  `;