import React from "react";
import cx from "classnames";
import moment from "moment";
import 'moment/locale/fr'
import {graphql, Link} from "gatsby"
import PageLayout from "../layouts/pageLayout"
import SectionLayout from "../layouts/sectionLayout"
import styles from "./templates.module.scss";
import NavigationPath from "../components/navigationPath/navigationPath";
import {MEDIA_CATEGORIES} from "../helpers/const";
import {Helmet} from "react-helmet";

class ActuTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
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
        let collapse = (window.innerWidth <= 1020 && window.innerWidth >= 600);
        if (collapse !== this.state.collapse) {
            this.setState({collapse: collapse});
        }
    }

    renderHeaderNewsImage() {
        const {currentNewsPost} = this.props.data; // data.markdownRemark holds our post data
        const {frontmatter} = currentNewsPost;
        let image;
        image = frontmatter.image ? frontmatter.image : MEDIA_CATEGORIES[frontmatter.category].image;
        return <img className={styles.backgroundImage} src={image}
                    alt={frontmatter.title} height="100%"
                    width="100%"/>
    }

    renderBodyNewsImage() {
        const {currentNewsPost} = this.props.data; // data.markdownRemark holds our post data
        const {frontmatter} = currentNewsPost;
        if (frontmatter.image) {
            return <img className={styles.backgroundImage} src={frontmatter.image}
                        alt={frontmatter.title} height="100%"
                        width="100%"/>
        }
        return null;
    }

    renderOtherNewsPanel() {
        const {otherNews} = this.props.data; // data.markdownRemark holds our post data
        const {edges} = otherNews;

        return <div className={styles.otherNews}>
            <div className={styles.otherNewsTitle}>
                <strong>Un dernier billet</strong>
                <br/>
                pour la route ?
            </div>
            <div className={styles.otherNewsList}>
                {edges.map(({node}, i) => {
                        const linkClassName = cx(styles.item, styles[node.frontmatter.category]);
                        const categoryClassName = cx(styles.category, styles[node.frontmatter.category]);
                        return <div key={i} className={styles.itemContainer}>
                            <Link className={linkClassName}
                                  to={`/posts/${node.fileAbsolutePath.substring(node.fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3)}`}>
                                <div className={styles.content}>
                                    <div className={categoryClassName}>
                                        <div
                                            className={styles.icon}>{MEDIA_CATEGORIES[node.frontmatter.category].icon}</div>
                                        <div>{MEDIA_CATEGORIES[node.frontmatter.category].name}</div>
                                    </div>
                                    <div className={styles.title}>{node.frontmatter.title}</div>
                                    <div className={styles.readMore}>
                                        <span/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    }
                )}
            </div>
        </div>
    }

    render() {
        const {currentNewsPost} = this.props.data; // data.markdownRemark holds our post data
        const {frontmatter, html, fileAbsolutePath} = currentNewsPost;
        moment.locale('fr');
        const classNames = cx(styles.newsPost, styles[frontmatter.category]);
        const navigationItems = [
            {
                title: "Accueil",
                path: '/'
            },
            {
                title: "Blog",
                path: '/blog/'
            },
            {
                title: MEDIA_CATEGORIES[frontmatter.category].name,
                path: MEDIA_CATEGORIES[frontmatter.category].path
            },
            {
                title: frontmatter.title,
                path: `/posts/${fileAbsolutePath.substring(fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3)}`
            }
        ];

        return (
            <PageLayout>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{frontmatter.title}</title>
                </Helmet>
                <div className={styles.newsHeader}>
                    <div className={styles.newsSectionTitle}>
                        <span>{frontmatter.title}</span>
                    </div>
                    {this.renderHeaderNewsImage()}
                </div>
                <SectionLayout withBorders noPaddingTop>
                    <div className={styles.newsWrapper}>
                        <NavigationPath navigationItems={navigationItems}/>
                        <div className={styles.newsPostContainer}>
                            <div className={classNames}>
                                <div className={styles.newsInfosContainer}>
                                    <div className={styles.newsInfos}>
                                        <div className={styles.dateContainer}>
                                            <div className={styles.category}>
                                                <Link to={MEDIA_CATEGORIES[frontmatter.category].path}>
                                                <span className={styles.icon}>{MEDIA_CATEGORIES[frontmatter.category].icon}</span>
                                                <span className={styles.text}>{MEDIA_CATEGORIES[frontmatter.category].name}</span>
                                                </Link>
                                            </div>
                                            <div className={styles.date}>{moment(frontmatter.date).format('LL')}</div>
                                        </div>
                                        <div className={styles.imgContainer}>
                                            {this.renderBodyNewsImage()}
                                        </div>
                                    </div>
                                    {this.state.collapse ? this.renderOtherNewsPanel() : null}
                                </div>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsBody} dangerouslySetInnerHTML={{__html: html}}/>
                                </div>
                            </div>

                            {!this.state.collapse ? this.renderOtherNewsPanel() : null}
                        </div>
                    </div>
                </SectionLayout>
            </PageLayout>
        )
    }
}

export default ActuTemplate;

// noinspection JSUnusedGlobalSymbols
export const pageQuery = graphql`
  query($id: String!) {
    currentNewsPost: markdownRemark(id: { eq: $id }) {
      fileAbsolutePath
      html
      frontmatter {
        date
        title
        image,
        category
      }
    }
    otherNews: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {id: {ne: $id}, frontmatter: {type: {eq: "post"}}}, limit: 5) {
          edges {
            node {            
              fileAbsolutePath
              frontmatter {
                date
                title,
                category
              }
            }
          }
      }
  }
`;