import React from "react"
import 'moment/locale/fr'
import cx from "classnames";
import {MEDIA_CATEGORIES} from "../helpers/const";
import {graphql} from "gatsby"
import PageLayout from "../layouts/pageLayout"
import SectionLayout from "../layouts/sectionLayout"
import Post from "../components/newsPost/post"
import styles from "./templates.module.scss";
import {Helmet} from "react-helmet";
import MediaFilters from "../components/mediaFilters/mediaFilters";
import NoPosts from "../components/noPosts/noPosts";

const Posts = ({posts}) => {
    if (posts.edges.length) {
        return posts.edges
            .map((post, i) => <Post odd={i % 2} key={post.node.id} post={post.node}/>);
    }
    return <NoPosts/>
};

export default function BlogTemplate(props) {
    const {data: {posts, allPosts}, pageContext: {category}} = props;

    const navigationItems = [
        {
            title: "Accueil",
            path: '/'
        },
        {
            title: "Blog",
            path: '/blog/'
        }
    ];

    if (category !== "all") {
        navigationItems.push({
            title: MEDIA_CATEGORIES[category].name,
            path: MEDIA_CATEGORIES[category].path
        })
    }

    const newsHeaderClasses = cx(styles.newsHeader, styles[category]);

    return <PageLayout>
        <Helmet>
            <meta charSet="utf-8"/>
            <title>GG - {MEDIA_CATEGORIES[category].name}</title>
        </Helmet>
        <div className={newsHeaderClasses}>
            <div className={styles.newsSectionTitle}>
                <span>{MEDIA_CATEGORIES[category].name}</span>
            </div>
            <img className={styles.backgroundImage} src={MEDIA_CATEGORIES[category].image}
                 alt={MEDIA_CATEGORIES[category].name} height="100%"
                 width="100%"/>
        </div>
        <SectionLayout navigationPath={navigationItems} noPaddingTop>
            <MediaFilters/>
            <div className={styles.postsContainer}>
                <Posts posts={category === "all" ? allPosts : posts}/>
            </div>
        </SectionLayout>
    </PageLayout>
}

export const blogCategoryQuery = graphql`
query($category: String!) {
    posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "post"}, category: {eq: $category}}}) {
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
      },
       allPosts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "post"}}}) {
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