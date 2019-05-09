import React from "react"
import {graphql, withPrefix} from "gatsby"
import cx from 'classnames';

import Post from "../components/newsPost/newsPost"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"

import styles from "./index.module.scss";
import Carousel from "../components/carousel/carousel";

/**
 * PAGE D'ACCUEIL DU SITE
 */
/**
 * @param {{edges:array}} news
 */
const IndexPage = ({data: {posts}}) => {
    return <PageLayout>
        <HomeCarousel posts={posts.edges.slice(0, 5)}/>
        <DescriptionSection/>
        <BlogSection posts={posts.edges}/>
        <TwitterSection/>
    </PageLayout>
};

export default IndexPage

const HomeCarousel = ({posts}) => {

    const items = posts.map((item) => {
        return {
            image: item.node.frontmatter.image ? withPrefix(item.node.frontmatter.image) : withPrefix('/assets/logo/GG.png'),
            title: item.node.frontmatter.title,
            tag: item.node.frontmatter.date,
            path: item.node.fileAbsolutePath,
        };
    });
    const settings = {
        clickText: "Lire la suite >",
    };
    return <Carousel settings={settings} items={items}/>
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
                 <div className={styles.obj}><strong>ob</strong></div>
                <div className={styles.subj}><strong>sub</strong></div>
            </div>
            <span><strong>jective</strong></span>
        </span>
    }

    render() {
        return <SectionLayout odd>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTextContainer}>
                    <div className={styles.titleContainer}>
                        <span>Développer mon <strong>esprit d'analyse</strong></span>
                    </div>
                    <div className={styles.body}>
                        <p>Je cherchais comment améliorer mon esprit d'analyse et mes compétences de rédaction. Je me
                            suis
                            dit que développer un bien joli site internet personnel m'obligerait à l'alimenter en
                            contenu.
                            Car un site internet vide, c'est moche, et un site rempli d'ipsem lorum parvient rarement à
                            capter l'attention d’éventuels visiteurs.</p>

                        <p> Voici donc mon site personnel de blogging, où l'on parlera médias culturels. J'analyserai
                            des
                            œuvres que j'affectionne dans les univers de jeux vidéo, cinéma, télévision, musique et
                            littérature.</p>

                        <p> Et ce, bien sûr, de manière totalement {this.renderSubjObj()}</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </SectionLayout>
    }
}


/**
 * SECTION 2: ACTUALITES
 */
const BlogSection = ({posts}) => {
    const Posts = posts
        .map((post, i) => <Post odd={i % 2} key={post.node.id} post={post.node}/>);

    const action = {
        title: "Voir toutes les billets",
        path: '/blog/'
    };

    return <SectionLayout title="Billets" action={action}>
        <div>
            {Posts}
        </div>
    </SectionLayout>
};

const TwitterSection = () => (
    <SectionLayout title="Réseaux Sociaux" odd>list of tweets</SectionLayout>
);

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
              }
            }
          }
      }
    }
  `;