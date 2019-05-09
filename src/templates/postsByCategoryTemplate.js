import React from "react"
import 'moment/locale/fr'
import {MEDIA_CATEGORIES} from "../helpers/const";
import {graphql} from "gatsby"
import PageLayout from "../layouts/pageLayout"
import SectionLayout from "../layouts/sectionLayout"
import Post from "../components/newsPost/post"
import styles from "./templates.module.scss";

export default function PostsByCategoryTemplate(props) {
    const {data: {posts}, pageContext: {category}} = props;

    const Posts = posts.edges
        .map((post, i) => <Post odd={i % 2} key={post.node.id} post={post.node}/>);

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
            title: MEDIA_CATEGORIES[category].name,
            path: MEDIA_CATEGORIES[category].path
        }
    ];

    return <PageLayout>
        <div className={styles.newsHeader}>
            <div className={styles.newsSectionTitle}>
                <span>{MEDIA_CATEGORIES[category].name}</span>
            </div>
            <img className={styles.backgroundImage} src={MEDIA_CATEGORIES[category].image}
                 alt={MEDIA_CATEGORIES[category].name} height="100%"
                 width="100%"/>
        </div>
        <SectionLayout navigationPath={navigationItems} noPaddingTop>
            <div>
                {Posts}
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
      }
  }
`;