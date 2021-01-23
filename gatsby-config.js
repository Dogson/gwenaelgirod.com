module.exports = {
    siteMetadata: {
        siteUrl: `https://www.gwenaelgirod.com`,
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                  {
                    site {
                      siteMetadata {
                        siteUrl
                      }
                    }
                  }
                `,
                feeds: [
                    {
                        serialize: ({query: {site, allMarkdownRemark}}) => {
                            return allMarkdownRemark.edges.map(edge => {
                                const slug = edge.node.fileAbsolutePath.substring(edge.node.fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3);
                                return Object.assign({}, edge.node.frontmatter, {
                                    title: edge.node.frontmatter.title,
                                    description: edge.node.frontmatter.summary,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + "/posts/" + slug,
                                    guid: slug,
                                    custom_elements: [{'content:encoded': edge.node.html}],
                                });
                            });
                        },
                        query: `
                          {
                            allMarkdownRemark(
                              limit: 1000,
                              sort: { order: DESC, fields: [frontmatter___date] },
                              filter: {frontmatter: {type: {eq: "post"}}},
                            ) {
                             edges {
                                node {
                                  html
                                  fileAbsolutePath  
                                  frontmatter {
                                    title
                                    date
                                    summary
                                  }
                                }
                              }
                            }
                          }
        `,
                        output: '/rss.xml',
                        title: "gwenaelgirod.com",
                        description: "Flux RSS des articles de gwenaelgirod.com",
                        link: "https://gwenaelgirod.com/"
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/posts`,
                name: "posts",
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/comments`,
                name: 'comments',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/tv`,
                name: 'avatars_tv',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/movies`,
                name: 'avatars_movies',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/gaming`,
                name: 'avatars_gaming',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/music`,
                name: 'avatars_music',
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-sass`
            // options: {
            //     includePaths: ["src/styles"]
            // }
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                // your google analytics tracking id
                trackingId: `UA-177949352-1`,
                // Puts tracking script in the head instead of the body
                head: false,
                // enable ip anonymization
                anonymize: true,
            },
        },
    ]
};