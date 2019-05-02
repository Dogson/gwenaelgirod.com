import React from "react"
import {graphql, withPrefix} from "gatsby"

import NewsPost from "../components/newsPost/newsPost"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"

import {markdownToHtml} from "../helpers/formatHelpers"

import styles from "./index.module.scss";
import Carousel from "../components/carousel/carousel";

/**
 * PAGE D'ACCUEIL DU SITE
 */
/**
 * @param {{edges:array}} priorityNews
 * @param {{edges:array}} news
 */
const IndexPage = ({data: {priorityNews, news, descriptionCFS}}) => {
    return <PageLayout>
        <HomeCarousel news={priorityNews.edges}/>
        <DescriptionSection description={descriptionCFS}/>
        <NewsSection news={news.edges}/>
        <TwitterSection/>
    </PageLayout>
};

export default IndexPage

const HomeCarousel = ({news}) => {

    const items = news.map((item) => {
        return {
            image: item.node.frontmatter.image ? withPrefix(item.node.frontmatter.image) : withPrefix('/assets/logo/CFS.png'),
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
const DescriptionSection = ({description: {frontmatter, html}}) => {
    const {title, schoolPartners, formationsNumber, companyPartners, hideStats} = frontmatter;

    // Statistique "Etablissements partenaires"
    function SchoolPartners() {
        if (schoolPartners) {
            return <div className={styles.statsItem}>
                <strong>{schoolPartners}</strong>
                <div>Établissements</div>
                <div>Partenaires</div>
            </div>
        }
        return null;
    }

    // Statistique "Formations"
    function FormationsNumber() {
        if (formationsNumber) {
            return <div className={styles.statsItem}>
                <strong>{formationsNumber}</strong>
                <div>Formations</div>
            </div>
        }
        return null;
    }

    // Statistique "Entreprises participantes"
    function CompanyPartners() {
        if (companyPartners) {
            return <div className={styles.statsItem}>
                <strong>{companyPartners}</strong>
                <div>Entreprises</div>
                <div>participantes</div>
            </div>
        }
        return null;
    }

    // Partie "En Chiffre" de l'encart de description
    function Statistics() {
        if (!hideStats) {
            return <div className={styles.statisticsContainer}>
                <div className={styles.statisticsTitle}><span>En chiffres</span></div>
                <div className={styles.statisticsContent}>
                    <SchoolPartners/>
                    <FormationsNumber/>
                    <CompanyPartners/>
                </div>
            </div>
        }
        return null;
    }

    return <SectionLayout odd>
        <div className={styles.descriptionContainer}>
            <div className={styles.descriptionTextContainer}>
                <div className={styles.titleContainer} dangerouslySetInnerHTML={{__html: markdownToHtml(title)}}/>
                <div className={styles.body}>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                    <Statistics/>
                </div>
            </div>
            <div>

            </div>
        </div>
    </SectionLayout>
};


/**
 * SECTION 2: ACTUALITES
 */
const NewsSection = ({news}) => {
    const Posts = news
        .map((newsPost, i) => <NewsPost odd={i % 2} key={newsPost.node.id} post={newsPost.node}/>);

    const action = {
        title: "Voir toutes les actualités",
        path: '/actualites/'
    };

    return <SectionLayout title="Actualités" action={action}>
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
      news: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "news"}}}, limit: 6) {
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
                priority
              }
            }
          }
      }
      priorityNews: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "news"}, image: {nin: [null, ""]}, priority: {eq: true}}}, limit: 5) {
          edges {
            node {            
              fileAbsolutePath
              frontmatter {
                date
                title
                image        
              }
            }
          }
      }
       descriptionCFS: markdownRemark(frontmatter: {type: {eq: "descriptionCFS"}}) {
        html,
        frontmatter {
          title
          summary
          hideStats
          schoolPartners
          formationsNumber
          companyPartners
        }
      }
    }
  `;